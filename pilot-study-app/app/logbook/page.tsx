"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../supabase"

interface LogEntry {
  id: string
  date: string
  aircraft_type: string
  aircraft_reg: string
  from_aerodrome: string
  to_aerodrome: string
  total_time: number
  pic_time: number
  dual_time: number
  instrument_time: number
  landings: number
  remarks: string
}

const emptyForm = {
  date: new Date().toISOString().split("T")[0],
  aircraft_type: "",
  aircraft_reg: "",
  from_aerodrome: "",
  to_aerodrome: "",
  total_time: "",
  pic_time: "",
  dual_time: "",
  instrument_time: "",
  landings: "",
  remarks: "",
}

function formatHours(h: number) {
  if (!h) return "0:00"
  const hrs = Math.floor(h)
  const mins = Math.round((h - hrs) * 60)
  return `${hrs}:${mins.toString().padStart(2, "0")}`
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px 24px" }}>
      <div style={{ fontSize: "12px", color: "var(--text2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: "12px", color: "var(--text2)", marginTop: "4px" }}>{sub}</div>}
    </div>
  )
}

export default function LogbookPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ ...emptyForm })
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/login"); return }
      setUserId(session.user.id)
      await fetchEntries(session.user.id)
      setLoading(false)
    })
  }, [])

  async function fetchEntries(uid: string) {
    const { data } = await supabase
      .from("logbook")
      .select("*")
      .eq("user_id", uid)
      .order("date", { ascending: false })
    if (data) setEntries(data)
  }

  function openAdd() {
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] })
    setEditId(null)
    setShowModal(true)
  }

  function openEdit(entry: LogEntry) {
    setForm({
      date: entry.date,
      aircraft_type: entry.aircraft_type || "",
      aircraft_reg: entry.aircraft_reg || "",
      from_aerodrome: entry.from_aerodrome || "",
      to_aerodrome: entry.to_aerodrome || "",
      total_time: entry.total_time?.toString() || "",
      pic_time: entry.pic_time?.toString() || "",
      dual_time: entry.dual_time?.toString() || "",
      instrument_time: entry.instrument_time?.toString() || "",
      landings: entry.landings?.toString() || "",
      remarks: entry.remarks || "",
    })
    setEditId(entry.id)
    setShowModal(true)
  }

  async function handleSave() {
    if (!userId) return
    setSaving(true)
    const payload = {
      user_id: userId,
      date: form.date,
      aircraft_type: form.aircraft_type,
      aircraft_reg: form.aircraft_reg.toUpperCase(),
      from_aerodrome: form.from_aerodrome.toUpperCase(),
      to_aerodrome: form.to_aerodrome.toUpperCase(),
      total_time: parseFloat(form.total_time) || 0,
      pic_time: parseFloat(form.pic_time) || 0,
      dual_time: parseFloat(form.dual_time) || 0,
      instrument_time: parseFloat(form.instrument_time) || 0,
      landings: parseInt(form.landings) || 0,
      remarks: form.remarks,
    }
    if (editId) {
      await supabase.from("logbook").update(payload).eq("id", editId)
    } else {
      await supabase.from("logbook").insert(payload)
    }
    await fetchEntries(userId)
    setShowModal(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!userId) return
    await supabase.from("logbook").delete().eq("id", id)
    await fetchEntries(userId)
    setDeleteConfirm(null)
    setExpandedEntry(null)
  }

  const totalTime = entries.reduce((s, e) => s + (e.total_time || 0), 0)
  const totalPIC = entries.reduce((s, e) => s + (e.pic_time || 0), 0)
  const totalDual = entries.reduce((s, e) => s + (e.dual_time || 0), 0)
  const totalLandings = entries.reduce((s, e) => s + (e.landings || 0), 0)

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--surface2)",
    color: "var(--text)",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text2)",
    marginBottom: "6px",
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "var(--text2)" }}>Loading logbook...</div>
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "60px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", margin: 0 }}>Pilot Logbook</h1>
            <p style={{ color: "var(--text2)", marginTop: "4px", fontSize: "14px" }}>{entries.length} {entries.length === 1 ? "flight" : "flights"} recorded</p>
          </div>
          <button onClick={openAdd} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "var(--navy)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
            + Add flight
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
          <StatCard label="Total time" value={formatHours(totalTime)} sub="hours : minutes" />
          <StatCard label="PIC time" value={formatHours(totalPIC)} />
          <StatCard label="Dual time" value={formatHours(totalDual)} />
          <StatCard label="Landings" value={totalLandings.toString()} />
        </div>

        {/* Entries */}
        {entries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--surface)", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✈️</div>
            <h3 style={{ color: "var(--text)", fontWeight: 700, marginBottom: "8px" }}>No flights yet</h3>
            <p style={{ color: "var(--text2)", marginBottom: "24px", fontSize: "14px" }}>Add your first flight to start building your logbook</p>
            <button onClick={openAdd} style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "var(--navy)", color: "white", fontWeight: 700, cursor: "pointer" }}>+ Add your first flight</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {entries.map(entry => {
              const isExpanded = expandedEntry === entry.id
              return (
                <div key={entry.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
                  {/* Main row */}
                  <button onClick={() => setExpandedEntry(isExpanded ? null : entry.id)} style={{ width: "100%", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "grid", gridTemplateColumns: "90px 1fr 1fr 80px 70px 24px", alignItems: "center", gap: "12px", textAlign: "left" }}>
                    <div style={{ fontSize: "13px", color: "var(--text2)" }}>{new Date(entry.date + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "14px" }}>{entry.aircraft_type || "—"} <span style={{ color: "var(--text2)", fontWeight: 400 }}>{entry.aircraft_reg}</span></div>
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--text)" }}>
                      {entry.from_aerodrome || "—"} <span style={{ color: "var(--text2)" }}>→</span> {entry.to_aerodrome || "—"}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "15px", fontWeight: 800, color: "var(--text)" }}>{formatHours(entry.total_time)}</div>
                      <div style={{ fontSize: "10px", color: "var(--text2)", fontWeight: 600 }}>TOTAL</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: entry.pic_time > 0 ? "#10b981" : "var(--text2)" }}>{entry.pic_time > 0 ? `PIC` : `DUAL`}</div>
                      <div style={{ fontSize: "11px", color: "var(--text2)" }}>{formatHours(entry.pic_time > 0 ? entry.pic_time : entry.dual_time)}</div>
                    </div>
                    <div style={{ color: "var(--text2)", fontSize: "12px" }}>{isExpanded ? "▲" : "▼"}</div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", background: "var(--surface2)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px" }}>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>PIC</div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>{formatHours(entry.pic_time)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Dual</div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>{formatHours(entry.dual_time)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Instrument</div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>{formatHours(entry.instrument_time)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Landings</div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text)" }}>{entry.landings || 0}</div>
                        </div>
                      </div>
                      {entry.remarks && (
                        <div style={{ padding: "10px 14px", background: "var(--surface)", borderRadius: "8px", fontSize: "13px", color: "var(--text2)", marginBottom: "16px" }}>
                          <span style={{ fontWeight: 600, color: "var(--text)" }}>Remarks: </span>{entry.remarks}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => openEdit(entry)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                        {deleteConfirm === entry.id ? (
                          <>
                            <button onClick={() => handleDelete(entry.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Confirm delete</button>
                            <button onClick={() => setDeleteConfirm(null)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text2)", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => setDeleteConfirm(entry.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div style={{ background: "var(--surface)", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h2 style={{ fontWeight: 800, color: "var(--text)", fontSize: "20px", margin: 0 }}>{editId ? "Edit flight" : "Add flight"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "20px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Date */}
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
              </div>

              {/* Aircraft */}
              <div>
                <label style={labelStyle}>Aircraft</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input placeholder="Type (e.g. C172)" value={form.aircraft_type} onChange={e => setForm({ ...form, aircraft_type: e.target.value })} style={inputStyle} />
                  <input placeholder="Registration" value={form.aircraft_reg} onChange={e => setForm({ ...form, aircraft_reg: e.target.value })} style={inputStyle} />
                </div>
              </div>

              {/* Route */}
              <div>
                <label style={labelStyle}>Route</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input placeholder="From (ICAO)" value={form.from_aerodrome} onChange={e => setForm({ ...form, from_aerodrome: e.target.value })} style={inputStyle} />
                  <input placeholder="To (ICAO)" value={form.to_aerodrome} onChange={e => setForm({ ...form, to_aerodrome: e.target.value })} style={inputStyle} />
                </div>
              </div>

              {/* Times */}
              <div>
                <label style={labelStyle}>Flight time (decimal hours)</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "4px", fontWeight: 600 }}>Total</div>
                    <input type="number" step="0.1" min="0" placeholder="1.5" value={form.total_time} onChange={e => setForm({ ...form, total_time: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "4px", fontWeight: 600 }}>PIC</div>
                    <input type="number" step="0.1" min="0" placeholder="0.0" value={form.pic_time} onChange={e => setForm({ ...form, pic_time: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "4px", fontWeight: 600 }}>Dual</div>
                    <input type="number" step="0.1" min="0" placeholder="0.0" value={form.dual_time} onChange={e => setForm({ ...form, dual_time: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text2)", marginBottom: "4px", fontWeight: 600 }}>Instrument</div>
                    <input type="number" step="0.1" min="0" placeholder="0.0" value={form.instrument_time} onChange={e => setForm({ ...form, instrument_time: e.target.value })} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Landings */}
              <div>
                <label style={labelStyle}>Landings</label>
                <input type="number" min="0" placeholder="1" value={form.landings} onChange={e => setForm({ ...form, landings: e.target.value })} style={{ ...inputStyle, maxWidth: "120px" }} />
              </div>

              {/* Remarks */}
              <div>
                <label style={labelStyle}>Remarks</label>
                <textarea placeholder="Exercise flown, notes..." value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px", paddingTop: "8px" }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Cancel</button>
                <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "var(--navy)", color: "white", fontWeight: 700, fontSize: "14px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : editId ? "Save changes" : "Add flight"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}