import React, { useState, useEffect } from 'react';
import { Scissors, Star, Gift, Shield, Users, Clock, Award, CheckCircle, XCircle, Calendar, Settings } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://wnmehjlqlkawccshqbbq.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_OM_DgvRiMktPg9zOeuxxkQ_SF8vCIOG';

const supabase = {
  from: (table) => ({
    select: (cols = '*') => ({
      eq: (col, val) => fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${cols}&${col}=eq.${val}`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      }).then(r => r.json()).then(data => ({ data, error: null })).catch(error => ({ data: null, error })),
      order: (col, opts = {}) => ({
        limit: (n) => fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${cols}&order=${col}.${opts.ascending === false ? 'desc' : 'asc'}&limit=${n}`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        }).then(r => r.json()).then(data => ({ data, error: null })).catch(error => ({ data: null, error }))
      }),
      then: (resolve) => fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${cols}`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      }).then(r => r.json()).then(data => resolve({ data, error: null })).catch(error => resolve({ data: null, error }))
    }),
    insert: (rows) => ({
      select: () => ({
        single: () => fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
          body: JSON.stringify(Array.isArray(rows) ? rows[0] : rows)
        }).then(r => r.json()).then(data => ({ data: Array.isArray(data) ? data[0] : data, error: null })).catch(error => ({ data: null, error }))
      })
    }),
    update: (vals) => ({
      eq: (col, val) => fetch(`${SUPABASE_URL}/rest/v1/${table}?${col}=eq.${val}`, {
        method: 'PATCH',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: JSON.stringify(vals)
      }).then(r => r.json()).then(data => ({ data, error: null })).catch(error => ({ data: null, error }))
    }),
    delete: () => ({
      eq: (col, val) => fetch(`${SUPABASE_URL}/rest/v1/${table}?${col}=eq.${val}`, {
        method: 'DELETE',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      }).then(r => ({ data: null, error: null })).catch(error => ({ data: null, error }))
    })
  }),
  rpc: (fn, params) => fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  }).then(r => r.json()).then(data => ({ data, error: null })).catch(error => ({ data: null, error }))
};

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCAKJAlgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8/wCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA9i/4ZW+P3/ROrv/AMDLb/47R/wyv8fv+idXf/gZbf8Ax2v1FzSHrXq/UYd2Zc7Py6/4ZX+Pv/ROrv8A8DLb/wCO0f8ADK/x9/6J1d/+Blt/8dr9RaKPqMO7DnZ+XX/DK/x9/wCidXf/AIGW3/x2j/hlf4+/9E6u/wDwMtv/AI7X6i0U/qEO7DnZ+XX/AAyv8ff+idXf/gZbf/HaX/hlb4/f9E6u/wDwMtv/AI7X6iU4Yx1o+oQ7sOdn5c/8MrfH7/onV3/4GW3/AMdo/wCGVvj9/wBE6u//AAMtv/jtfqNSZpfUYd2L2jPy6/4ZW+P3/ROrv/wMtv8A47R/wyv8fv8AonV3/wCBlt/8dr9RaKPqMO7DnZ+XX/DK/wAff+idXf8A4GW3/wAdo/4ZX+Pv/ROrv/wMtv8A47X6i0UfUId2HOz8uv8Ahlf4+/8AROrv/wADLb/47Sf8MrfH7/onV3/4GW3/AMdr9RqKPqEO7DnZ+XX/AAyt8fv+idXf/gZbf/HaP+GVvj9/0Tq7/wDAy2/+O1+ouaQ0fUYd2HOz8uv+GVvj9/0Tq7/8DLb/AOO0f8Mr/H3/AKJ1d/8AgZbf/Ha/UWij6hDuw52fl1/wyv8AH3/onV3/AOBlt/8AHaT/AIZW+P3/AETq7/8AAy2/+O1+o9FH1CHdhzs/Lr/hlb4/f9E6u/8AwMtv/jtH/DK3x+/6J1d/+Blt/wDHa/UXNJmj6hDuw52fl1/wyt8fv+idXf8A4GW3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";

// ---- External Page Components ----

function LandingPage({ setPage, loadBarberData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900">
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.03) 10px, rgba(255,255,255,.03) 20px)` }} />
      </div>
      <header className="relative z-10 border-b border-amber-700/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
              <img src={LOGO_SRC} alt="Pietros Barber Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-amber-400" style={{ fontFamily: 'Georgia, serif' }}>PIETROS BARBER</h1>
              <p className="text-xs text-amber-600 tracking-widest hidden sm:block">CLASSIC CUTS · MODERN STYLE</p>
            </div>
          </div>
          <button onClick={() => { setPage('barber'); loadBarberData(); }} className="text-amber-500 hover:text-amber-400 transition-colors text-sm">
            <Shield className="w-5 h-5" />
          </button>
        </div>
      </header>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-20">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-600/20 border border-amber-600/50 rounded-full">
            <span className="text-amber-400 text-sm font-semibold tracking-wider">PROGRAMA DE FIDELIZACION</span>
          </div>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-8 px-2">
            Cada visita te acerca a beneficios exclusivos. Acumula visitas y disfruta descuentos especiales.
          </p>
          <button onClick={() => setPage('register')} className="group relative px-8 py-4 bg-amber-600 text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-600/50 w-full sm:w-auto">
            <span className="relative z-10">REGISTRAR MI VISITA</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 md:mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/50 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-amber-600/20 p-4 rounded-xl"><Gift className="w-8 h-8 text-amber-400" /></div>
                <div><h3 className="text-2xl font-bold text-white mb-2">50% OFF</h3><p className="text-amber-500 font-semibold">En tu quinta visita</p></div>
              </div>
              <p className="text-zinc-400">Alcanza 5 visitas validadas y obten un descuento del 50% en tu corte. Simple y directo.</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8 hover:border-amber-600/50 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-amber-600/20 p-4 rounded-xl"><Award className="w-8 h-8 text-amber-400" /></div>
                <div><h3 className="text-2xl font-bold text-white mb-2">CORTE GRATIS</h3><p className="text-amber-500 font-semibold">En tu decima visita</p></div>
              </div>
              <p className="text-zinc-400">Completa 10 visitas y tu proximo corte es totalmente gratis. Luego el ciclo comienza de nuevo.</p>
            </div>
          </div>
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>Como funciona?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/20 rounded-full mb-4"><Users className="w-8 h-8 text-amber-400" /></div>
              <h4 className="text-lg font-bold text-white mb-2">1. Registrate</h4>
              <p className="text-zinc-400 text-sm">Completa tus datos personales una sola vez en nuestro sistema</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/20 rounded-full mb-4"><Clock className="w-8 h-8 text-amber-400" /></div>
              <h4 className="text-lg font-bold text-white mb-2">2. Registra tu visita</h4>
              <p className="text-zinc-400 text-sm">Despues de cada corte, registra tu visita desde cualquier dispositivo</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600/20 rounded-full mb-4"><CheckCircle className="w-8 h-8 text-amber-400" /></div>
              <h4 className="text-lg font-bold text-white mb-2">3. El barbero valida</h4>
              <p className="text-zinc-400 text-sm">Tu visita sera validada por el barbero para acumular en tu cuenta</p>
            </div>
          </div>
          <div className="mt-10 p-6 bg-amber-600/10 border border-amber-600/30 rounded-xl">
            <p className="text-center text-zinc-300"><span className="text-amber-400 font-semibold">Importante:</span> Debes registrarte fisicamente en la barberia la primera vez. Luego podras registrar tus visitas online.</p>
          </div>
        </div>
      </div>
      <footer className="relative z-10 border-t border-amber-700/30 bg-black/20 backdrop-blur-sm mt-10 md:mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          <p>2026 Pietros Barber. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function RegisterPage({ setPage, formData, setFormData, registerVisit, loading, showSuccess, setShowSuccess, registeredCustomer, setRegisteredCustomer, getProgress }) {
  const progress = registeredCustomer ? getProgress(registeredCustomer) : null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900">
      <div className="fixed inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.03) 10px, rgba(255,255,255,.03) 20px)` }} /></div>
      <header className="relative z-10 border-b border-amber-700/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => { setPage('landing'); setShowSuccess(false); setRegisteredCustomer(null); }} className="text-amber-400 hover:text-amber-300 transition-colors">{'<-'} Volver</button>
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img src={LOGO_SRC} alt="Pietros Barber Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-amber-400 font-bold">PIETROS BARBER</span>
          </div>
        </div>
      </header>
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 md:py-12">
        {showSuccess && registeredCustomer ? (
          <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              {registeredCustomer.cycle_visits === 5 ? (
                <><div className="inline-block p-4 bg-amber-600/20 rounded-full mb-4"><Gift className="w-12 h-12 text-amber-400" /></div><h2 className="text-3xl font-bold text-white mb-2">FELICITACIONES!</h2><p className="text-amber-400 text-xl font-semibold">50% DE DESCUENTO APLICADO</p></>
              ) : registeredCustomer.cycle_visits === 10 ? (
                <><div className="inline-block p-4 bg-amber-600/20 rounded-full mb-4"><Award className="w-12 h-12 text-amber-400" /></div><h2 className="text-3xl font-bold text-white mb-2">CICLO COMPLETADO!</h2><p className="text-amber-400 text-xl font-semibold">CORTE GRATIS APLICADO</p></>
              ) : (
                <><div className="inline-block p-4 bg-green-600/20 rounded-full mb-4"><CheckCircle className="w-12 h-12 text-green-400" /></div><h2 className="text-3xl font-bold text-white mb-2">Visita Registrada!</h2><p className="text-zinc-400">Pendiente de validacion del barbero</p></>
              )}
            </div>
            <div className="mb-6">
              <div className="flex justify-center flex-wrap gap-2 mb-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < progress.cycleVisits ? 'bg-amber-600 text-black scale-110' : 'bg-zinc-800 text-zinc-600'}`}>
                    {i < progress.cycleVisits ? <Star className="w-4 h-4 fill-current" /> : i + 1}
                  </div>
                ))}
              </div>
              <p className="text-center text-zinc-400 text-sm">{progress.cycleVisits}/10 visitas en este ciclo</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-6 space-y-3">
              <div className="flex justify-between"><span className="text-zinc-400">Total de visitas:</span><span className="text-white font-semibold">{progress.totalVisits}</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Visitas validadas:</span><span className="text-white font-semibold">{progress.validatedVisits}</span></div>
              <div className="pt-3 border-t border-zinc-700"><p className="text-amber-400 font-semibold">{progress.nextBenefit}</p></div>
            </div>
            <button onClick={() => { setShowSuccess(false); setRegisteredCustomer(null); }} className="w-full mt-6 px-6 py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors">
              Registrar Nueva Visita
            </button>
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>Registra tu Visita</h2>
            <p className="text-zinc-400 mb-8">Completa tus datos para registrar tu visita en Pietros Barber</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Nombre</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-600 transition-colors" placeholder="Juan" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Apellido</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-600 transition-colors" placeholder="Perez" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-600 transition-colors" placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">Telefono</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-600 transition-colors" placeholder="+54 11 1234-5678" />
              </div>
              <button onClick={registerVisit} disabled={loading} className="w-full mt-6 px-6 py-4 bg-amber-600 text-black font-bold text-lg rounded-lg hover:bg-amber-500 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'REGISTRANDO...' : 'REGISTRAR VISITA'}
              </button>
            </div>
            <div className="mt-8 p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
              <p className="text-zinc-300 text-sm text-center">Tus visitas seran validadas por el barbero antes de acumularse en tu cuenta</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BarberPage({
  isBarberAuth, setIsBarberAuth,
  barberPin, setBarberPin,
  currentPin, loadBarberData,
  setPage, showSettings, setShowSettings,
  newPin, setNewPin, confirmPin, setConfirmPin,
  changePin, customers, pendingVisits,
  loading, validateVisit, rejectVisit
}) {
  if (!isBarberAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900 flex items-center justify-center p-6">
        <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-amber-600/20 rounded-full mb-4"><Shield className="w-12 h-12 text-amber-400" /></div>
            <h2 className="text-2xl font-bold text-white mb-2">Panel del Barbero</h2>
            <p className="text-zinc-400">Ingresa el PIN para acceder</p>
          </div>
          <input type="password" value={barberPin} onChange={(e) => setBarberPin(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter' && barberPin === currentPin) { setIsBarberAuth(true); loadBarberData(); } }}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-amber-600 mb-4" placeholder="----" maxLength={8} />
          <button onClick={() => { if (barberPin === currentPin) { setIsBarberAuth(true); loadBarberData(); } else { alert('PIN incorrecto'); } }}
            className="w-full px-6 py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors">INGRESAR</button>
          <button onClick={() => setPage('landing')} className="w-full mt-4 text-zinc-400 hover:text-white transition-colors">{'<-'} Volver al inicio</button>
        </div>
      </div>
    );
  }

  const allCustomers = customers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900">
      <div className="fixed inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.03) 10px, rgba(255,255,255,.03) 20px)` }} /></div>
      <header className="relative z-10 border-b border-amber-700/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-amber-400" /><h1 className="text-base md:text-xl font-bold text-white">Panel del Barbero</h1></div>
          <div className="flex items-center gap-2">
            <button onClick={loadBarberData} className="px-3 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-300 hover:text-white hover:border-amber-600 transition-colors rounded-lg font-semibold text-xs md:text-sm">Actualizar</button>
            <button onClick={() => setShowSettings(!showSettings)} className="px-3 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-300 hover:text-white hover:border-amber-600 transition-colors rounded-lg font-semibold text-xs md:text-sm"><span className="hidden sm:inline">PIN</span><Settings className="w-4 h-4 sm:hidden inline" /></button>
            <button onClick={() => { setIsBarberAuth(false); setBarberPin(''); setPage('landing'); }} className="text-zinc-400 hover:text-white transition-colors text-sm">Salir</button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-12">
        {showSettings && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 border border-amber-700/30 rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-6">Cambiar PIN</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Nuevo PIN</label>
                  <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-amber-600" placeholder="----" maxLength={8} />
                  <p className="text-xs text-zinc-500 mt-1">Minimo 4 caracteres</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">Confirmar PIN</label>
                  <input type="password" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-amber-600" placeholder="----" maxLength={8} />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setShowSettings(false); setNewPin(''); setConfirmPin(''); }} className="flex-1 px-6 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors">Cancelar</button>
                <button onClick={changePin} className="flex-1 px-6 py-3 bg-amber-600 text-black font-bold rounded-lg hover:bg-amber-500 transition-colors">Guardar</button>
              </div>
              <div className="mt-6 p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
                <p className="text-zinc-300 text-xs text-center">Este PIN se guardara de forma segura en Supabase</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
          <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2"><Clock className="w-6 h-6 text-amber-400" /><span className="text-zinc-400 font-semibold">Visitas Pendientes</span></div>
            <p className="text-4xl font-bold text-white">{loading ? '...' : pendingVisits.length}</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2"><Users className="w-6 h-6 text-amber-400" /><span className="text-zinc-400 font-semibold">Total Clientes</span></div>
            <p className="text-4xl font-bold text-white">{loading ? '...' : allCustomers.length}</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2"><CheckCircle className="w-6 h-6 text-green-400" /><span className="text-zinc-400 font-semibold">Visitas Validadas</span></div>
            <p className="text-4xl font-bold text-white">{loading ? '...' : allCustomers.reduce((sum, c) => sum + (c.total_visits || 0), 0)}</p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Clock className="w-6 h-6 text-amber-400" />Visitas Pendientes de Validacion</h2>
          {loading ? (
            <div className="text-center py-12"><p className="text-zinc-400">Cargando...</p></div>
          ) : pendingVisits.length === 0 ? (
            <div className="text-center py-12"><CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" /><p className="text-zinc-400">No hay visitas pendientes</p></div>
          ) : (
            <div className="space-y-4">
              {pendingVisits.map(({ customer, visit }) => (
                <div key={visit.id} className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-white">{customer.first_name} {customer.last_name}</h3>
                        {visit.benefit && (<span className="px-3 py-1 bg-amber-600 text-black text-xs font-bold rounded-full">{visit.benefit}</span>)}
                      </div>
                      <div className="space-y-1 text-sm text-zinc-400">
                        <p>{customer.email}</p>
                        <p>{customer.phone}</p>
                        <p>{new Date(visit.created_at).toLocaleString('es-AR')}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="text-zinc-400 text-sm">Progreso:</span>
                        <div className="flex gap-1 flex-wrap">
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className={`w-5 h-5 rounded-full ${i < customer.cycle_visits ? 'bg-amber-600' : 'bg-zinc-700'}`} />
                          ))}
                        </div>
                        <span className="text-white font-semibold text-sm">{customer.cycle_visits}/10</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button onClick={() => validateVisit(visit.id, customer.id, customer.cycle_visits, customer.total_visits, customer.current_cycle)}
                        className="px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />VALIDAR
                      </button>
                      <button onClick={() => rejectVisit(visit.id, customer.id, customer.cycle_visits)}
                        className="px-4 py-3 bg-red-600/80 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" />RECHAZAR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-4 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Users className="w-6 h-6 text-amber-400" />Todos los Clientes</h2>
          {loading ? (
            <div className="text-center py-12"><p className="text-zinc-400">Cargando...</p></div>
          ) : allCustomers.length === 0 ? (
            <div className="text-center py-12"><Users className="w-16 h-16 text-zinc-600 mx-auto mb-4 opacity-50" /><p className="text-zinc-400">No hay clientes registrados</p></div>
          ) : (
            <div className="space-y-4">
              {allCustomers.map((customer) => {
                const validatedVisits = (customer.visits || []).filter(v => v.status === 'validated');
                return (
                  <div key={customer.id} className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{customer.first_name} {customer.last_name}</h3>
                        <div className="space-y-1 text-sm text-zinc-400 mb-3">
                          <p>{customer.email}</p>
                          <p>{customer.phone}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-zinc-400">Total: <span className="text-white font-semibold">{customer.total_visits || 0}</span></span>
                          <span className="text-zinc-400">Ciclo: <span className="text-amber-400 font-semibold">{customer.cycle_visits || 0}/10</span></span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-5 h-5 rounded-full ${i < (customer.cycle_visits || 0) ? 'bg-amber-600' : 'bg-zinc-700'}`} />
                        ))}
                      </div>
                    </div>
                    {validatedVisits.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-zinc-700">
                        <p className="text-zinc-400 text-sm mb-2">Historial de visitas validadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {validatedVisits.slice(-5).reverse().map((visit) => (
                            <div key={visit.id} className="px-3 py-1 bg-zinc-700/50 rounded-lg text-xs text-zinc-300 flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {new Date(visit.created_at).toLocaleDateString('es-AR')}
                              {visit.benefit && (<span className="text-amber-400 font-semibold">- {visit.benefit}</span>)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Main Component ----

export default function PietrosBarber() {
  const [page, setPage] = useState('landing');
  const [customers, setCustomers] = useState([]);
  const [pendingVisits, setPendingVisits] = useState([]);
  const [barberPin, setBarberPin] = useState('');
  const [isBarberAuth, setIsBarberAuth] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [registeredCustomer, setRegisteredCustomer] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPin, setCurrentPin] = useState('1234');
  const [showSettings, setShowSettings] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPin();
  }, []);

  const loadPin = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/settings?key=eq.barber_pin&select=value`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const data = await res.json();
      if (data && data.length > 0) setCurrentPin(data[0].value);
    } catch (e) {}
  };

  const loadBarberData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/customers?select=*,visits(*)&order=created_at.desc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setCustomers(data);
        const pending = [];
        data.forEach(customer => {
          (customer.visits || []).forEach(visit => {
            if (visit.status === 'pending') {
              pending.push({ customer, visit });
            }
          });
        });
        setPendingVisits(pending);
      }
    } catch (e) {}
    setLoading(false);
  };

  const registerVisit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/customers?email=eq.${encodeURIComponent(formData.email.toLowerCase())}&select=*`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const existing = await checkRes.json();
      
      let customer;
      if (existing && existing.length > 0) {
        customer = existing[0];
        await fetch(`${SUPABASE_URL}/rest/v1/customers?id=eq.${customer.id}`, {
          method: 'PATCH',
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ first_name: formData.firstName, last_name: formData.lastName, phone: formData.phone })
        });
        customer.first_name = formData.firstName;
        customer.last_name = formData.lastName;
      } else {
        const createRes = await fetch(`${SUPABASE_URL}/rest/v1/customers`, {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email.toLowerCase(),
            phone: formData.phone,
            total_visits: 0,
            cycle_visits: 0,
            current_cycle: 1
          })
        });
        const newCustomers = await createRes.json();
        customer = Array.isArray(newCustomers) ? newCustomers[0] : newCustomers;
      }

      const nextCycleVisit = (customer.cycle_visits || 0) + 1;
      let benefit = null;
      if (nextCycleVisit === 5) benefit = '50% OFF';
      else if (nextCycleVisit === 10) benefit = 'CORTE GRATIS';

      await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
        method: 'POST',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: customer.id,
          status: 'pending',
          benefit,
          cycle_number: customer.current_cycle || 1
        })
      });

      await fetch(`${SUPABASE_URL}/rest/v1/customers?id=eq.${customer.id}`, {
        method: 'PATCH',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycle_visits: nextCycleVisit })
      });

      customer.cycle_visits = nextCycleVisit;
      customer.benefit = benefit;
      setRegisteredCustomer(customer);
      setShowSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    } catch (e) {
      alert('Error al registrar la visita. Por favor intenta de nuevo.');
    }
    setLoading(false);
  };

  const validateVisit = async (visitId, customerId, currentCycleVisits, currentTotalVisits, currentCycle) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/visits?id=eq.${visitId}`, {
        method: 'PATCH',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'validated', validated_at: new Date().toISOString() })
      });

      let newCycleVisits = currentCycleVisits;
      let newCycle = currentCycle;
      let newTotalVisits = (currentTotalVisits || 0) + 1;

      if (currentCycleVisits >= 10) {
        newCycleVisits = 0;
        newCycle = (currentCycle || 1) + 1;
      }

      await fetch(`${SUPABASE_URL}/rest/v1/customers?id=eq.${customerId}`, {
        method: 'PATCH',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_visits: newTotalVisits, cycle_visits: newCycleVisits, current_cycle: newCycle })
      });

      await loadBarberData();
    } catch (e) {
      alert('Error al validar la visita');
    }
  };

  const rejectVisit = async (visitId, customerId, currentCycleVisits) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/visits?id=eq.${visitId}`, {
        method: 'DELETE',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const newCycleVisits = Math.max(0, (currentCycleVisits || 0) - 1);
      await fetch(`${SUPABASE_URL}/rest/v1/customers?id=eq.${customerId}`, {
        method: 'PATCH',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycle_visits: newCycleVisits })
      });
      await loadBarberData();
    } catch (e) {
      alert('Error al rechazar la visita');
    }
  };

  const changePin = async () => {
    if (!newPin || newPin.length < 4) { alert('El PIN debe tener al menos 4 caracteres'); return; }
    if (newPin !== confirmPin) { alert('Los PINs no coinciden'); return; }
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/settings`, {
        method: 'POST',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'barber_pin', value: newPin })
      });
      setCurrentPin(newPin);
      setNewPin(''); setConfirmPin(''); setShowSettings(false);
      alert('PIN actualizado correctamente');
    } catch (e) {
      alert('Error al guardar el PIN');
    }
  };

  const getProgress = (customer) => {
    const cycleVisits = customer?.cycle_visits || 0;
    const validatedVisits = (customer?.visits || []).filter(v => v.status === 'validated').length;
    return {
      cycleVisits,
      validatedVisits,
      totalVisits: customer?.total_visits || 0,
      nextBenefit: cycleVisits < 5 ? `50% OFF en visita 5 (te faltan ${5 - cycleVisits})` :
                   cycleVisits < 10 ? `Corte gratis en visita 10 (te faltan ${10 - cycleVisits})` :
                   'Completaste el ciclo!'
    };
  };

  return (
    <div>
      {page === 'landing' && (
        <LandingPage
          setPage={setPage}
          loadBarberData={loadBarberData}
        />
      )}
      {page === 'register' && (
        <RegisterPage
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
          registerVisit={registerVisit}
          loading={loading}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          registeredCustomer={registeredCustomer}
          setRegisteredCustomer={setRegisteredCustomer}
          getProgress={getProgress}
        />
      )}
      {page === 'barber' && (
        <BarberPage
          isBarberAuth={isBarberAuth}
          setIsBarberAuth={setIsBarberAuth}
          barberPin={barberPin}
          setBarberPin={setBarberPin}
          currentPin={currentPin}
          loadBarberData={loadBarberData}
          setPage={setPage}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          newPin={newPin}
          setNewPin={setNewPin}
          confirmPin={confirmPin}
          setConfirmPin={setConfirmPin}
          changePin={changePin}
          customers={customers}
          pendingVisits={pendingVisits}
          loading={loading}
          validateVisit={validateVisit}
          rejectVisit={rejectVisit}
        />
      )}
    </div>
  );
}
