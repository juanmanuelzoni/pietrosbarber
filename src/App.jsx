import React, { useState, useEffect } from 'react';
import { Scissors, Star, Gift, Shield, Users, Clock, Award, CheckCircle, XCircle, Calendar, Settings, MapPin, ChevronRight } from 'lucide-react';

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

const LOGO_SRC = "/images/logo.png";

// ---- External Page Components ----

function LandingPage({ setPage, loadBarberData }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src="/images/barber-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-[#c9a84c]/20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#c9a84c]/40">
                <img src={LOGO_SRC} alt="Pietros Barber Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-[#c9a84c] tracking-[0.2em]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>PIETRO'S BARBER</h1>
                <div className="flex items-center gap-1 text-[#8a7a50] text-xs tracking-[0.15em]">
                  <MapPin className="w-3 h-3" />
                  <span>LOS CARDALES, BS. AS.</span>
                </div>
              </div>
            </div>
            <button onClick={() => { setPage('barber'); loadBarberData(); }} className="text-[#8a7a50] hover:text-[#c9a84c] transition-colors">
              <Shield className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-2 border-[#c9a84c]/30 shadow-2xl shadow-[#c9a84c]/10">
                <img src={LOGO_SRC} alt="Pietros Barber" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-[#c9a84c]/30 rounded-full">
              <Scissors className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em]">PROGRAMA DE FIDELIDAD</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {'Tu estilo,'}
              <br />
              <span className="text-[#c9a84c]">{'nuestro arte'}</span>
            </h2>
            <p className="text-[#9a9a9a] text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Cada visita te acerca a beneficios exclusivos. Acumula cortes y disfruta descuentos que solo vos mereces.
            </p>
            <button
              onClick={() => setPage('register')}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-[#0a0a0a] font-bold text-sm tracking-[0.15em] rounded-none hover:bg-[#d4b85c] transition-all duration-300 hover:shadow-xl hover:shadow-[#c9a84c]/20"
            >
              REGISTRAR MI VISITA
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 pb-8 flex justify-center">
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c]/50 to-transparent" />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em]">BENEFICIOS</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Tus cortes tienen premio
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group border border-[#1a1a1a] hover:border-[#c9a84c]/30 bg-[#0f0f0f] p-8 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#c9a84c]/10 p-3 rounded-none border border-[#c9a84c]/20">
                  <Gift className="w-7 h-7 text-[#c9a84c]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">50% OFF</h4>
                  <p className="text-[#c9a84c] font-semibold text-sm tracking-wide">En tu quinta visita</p>
                </div>
              </div>
              <p className="text-[#777] leading-relaxed">Alcanza 5 visitas validadas y obten un descuento del 50% en tu corte. Simple y directo.</p>
              <div className="mt-6 flex gap-1.5">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i === 5 ? 'bg-[#c9a84c]' : 'bg-[#2a2a2a]'}`} />
                ))}
              </div>
            </div>

            <div className="group border border-[#1a1a1a] hover:border-[#c9a84c]/30 bg-[#0f0f0f] p-8 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#c9a84c]/10 p-3 rounded-none border border-[#c9a84c]/20">
                  <Award className="w-7 h-7 text-[#c9a84c]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">CORTE GRATIS</h4>
                  <p className="text-[#c9a84c] font-semibold text-sm tracking-wide">En tu decima visita</p>
                </div>
              </div>
              <p className="text-[#777] leading-relaxed">Completa 10 visitas y tu proximo corte es totalmente gratis. Luego el ciclo comienza de nuevo.</p>
              <div className="mt-6 flex gap-1.5">
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i === 10 ? 'bg-[#c9a84c]' : 'bg-[#2a2a2a]'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="relative px-4 py-16 md:py-24 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em]">EL PROCESO</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {'Como funciona?'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a84c]/30 bg-[#0f0f0f] rounded-none group-hover:border-[#c9a84c] transition-colors">
                  <span className="text-[#c9a84c] text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>1</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Registrate</h4>
              <p className="text-[#777] text-sm leading-relaxed">Completa tus datos personales una sola vez en nuestro sistema</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a84c]/30 bg-[#0f0f0f] rounded-none group-hover:border-[#c9a84c] transition-colors">
                  <span className="text-[#c9a84c] text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>2</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Registra tu visita</h4>
              <p className="text-[#777] text-sm leading-relaxed">Despues de cada corte, registra tu visita desde cualquier dispositivo</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a84c]/30 bg-[#0f0f0f] rounded-none group-hover:border-[#c9a84c] transition-colors">
                  <span className="text-[#c9a84c] text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>3</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">El barbero valida</h4>
              <p className="text-[#777] text-sm leading-relaxed">Tu visita sera validada por el barbero para acumular en tu cuenta</p>
            </div>
          </div>

          <div className="mt-12 p-6 border border-[#c9a84c]/20 bg-[#c9a84c]/5">
            <p className="text-center text-[#9a9a9a] text-sm">
              <span className="text-[#c9a84c] font-semibold">Importante:</span> Debes registrarte fisicamente en la barberia la primera vez. Luego podras registrar tus visitas online.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c9a84c]/20">
            <img src={LOGO_SRC} alt="PB" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-1.5 text-[#555] text-xs">
            <MapPin className="w-3 h-3" />
            <span>Los Cardales, Buenos Aires, Argentina</span>
          </div>
          <p className="text-[#333] text-xs">2026 Pietro's Barber. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function RegisterPage({ setPage, formData, setFormData, registerVisit, loading, showSuccess, setShowSuccess, registeredCustomer, setRegisteredCustomer, getProgress }) {
  const progress = registeredCustomer ? getProgress(registeredCustomer) : null;
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#c9a84c]/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => { setPage('landing'); setShowSuccess(false); setRegisteredCustomer(null); }} className="text-[#c9a84c] hover:text-[#d4b85c] transition-colors text-sm flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Volver
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c9a84c]/30">
              <img src={LOGO_SRC} alt="PB" className="w-full h-full object-cover" />
            </div>
            <span className="text-[#c9a84c] font-bold text-sm tracking-[0.15em]">PIETRO'S</span>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 md:py-16">
        {showSuccess && registeredCustomer ? (
          <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-8">
            <div className="text-center mb-8">
              {registeredCustomer.cycle_visits === 5 ? (
                <>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#c9a84c]/10 border border-[#c9a84c]/30 mb-4">
                    <Gift className="w-10 h-10 text-[#c9a84c]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>FELICITACIONES!</h2>
                  <p className="text-[#c9a84c] text-lg font-semibold tracking-wide">50% DE DESCUENTO APLICADO</p>
                </>
              ) : registeredCustomer.cycle_visits === 10 ? (
                <>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#c9a84c]/10 border border-[#c9a84c]/30 mb-4">
                    <Award className="w-10 h-10 text-[#c9a84c]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>CICLO COMPLETADO!</h2>
                  <p className="text-[#c9a84c] text-lg font-semibold tracking-wide">CORTE GRATIS APLICADO</p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/20 border border-green-700/30 mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Visita Registrada!</h2>
                  <p className="text-[#777]">Pendiente de validacion del barbero</p>
                </>
              )}
            </div>

            {/* Progress dots */}
            <div className="mb-8">
              <div className="flex justify-center flex-wrap gap-2 mb-3">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all ${i < progress.cycleVisits ? 'bg-[#c9a84c] text-[#0a0a0a]' : 'bg-[#1a1a1a] text-[#555] border border-[#2a2a2a]'}`}>
                    {i < progress.cycleVisits ? <Star className="w-4 h-4 fill-current" /> : i + 1}
                  </div>
                ))}
              </div>
              <p className="text-center text-[#777] text-sm">{progress.cycleVisits}/10 visitas en este ciclo</p>
            </div>

            {/* Stats */}
            <div className="border border-[#1a1a1a] bg-[#0a0a0a] p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#777]">Total de visitas:</span>
                <span className="text-white font-semibold">{progress.totalVisits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777]">Visitas validadas:</span>
                <span className="text-white font-semibold">{progress.validatedVisits}</span>
              </div>
              <div className="pt-3 border-t border-[#1a1a1a]">
                <p className="text-[#c9a84c] font-semibold text-sm">{progress.nextBenefit}</p>
              </div>
            </div>

            <button onClick={() => { setShowSuccess(false); setRegisteredCustomer(null); }} className="w-full mt-6 px-6 py-4 bg-[#c9a84c] text-[#0a0a0a] font-bold tracking-[0.1em] hover:bg-[#d4b85c] transition-colors">
              REGISTRAR NUEVA VISITA
            </button>
          </div>
        ) : (
          <div className="border border-[#1a1a1a] bg-[#0f0f0f]">
            <div className="p-8">
              <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em]">NUEVA VISITA</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Registra tu visita</h2>
              <p className="text-[#777] mb-8">Completa tus datos para registrar tu visita en Pietro's Barber</p>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#999] mb-2 tracking-[0.1em]">NOMBRE</label>
                    <input type="text" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder-[#444] focus:outline-none focus:border-[#c9a84c] transition-colors"
                      placeholder="Juan" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#999] mb-2 tracking-[0.1em]">APELLIDO</label>
                    <input type="text" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder-[#444] focus:outline-none focus:border-[#c9a84c] transition-colors"
                      placeholder="Perez" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#999] mb-2 tracking-[0.1em]">EMAIL</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder-[#444] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="juan@ejemplo.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#999] mb-2 tracking-[0.1em]">TELEFONO</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder-[#444] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="+54 11 1234-5678" />
                </div>
                <button onClick={registerVisit} disabled={loading}
                  className="w-full mt-4 px-6 py-4 bg-[#c9a84c] text-[#0a0a0a] font-bold text-sm tracking-[0.15em] hover:bg-[#d4b85c] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'REGISTRANDO...' : 'REGISTRAR VISITA'}
                </button>
              </div>
            </div>
            <div className="px-8 py-5 bg-[#c9a84c]/5 border-t border-[#c9a84c]/10">
              <p className="text-[#999] text-xs text-center tracking-wide">Tus visitas seran validadas por el barbero antes de acumularse en tu cuenta</p>
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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c9a84c]/10 border border-[#c9a84c]/20 mb-4">
              <Shield className="w-8 h-8 text-[#c9a84c]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Panel del Barbero</h2>
            <p className="text-[#777] text-sm">Ingresa el PIN para acceder</p>
          </div>
          <input type="password" value={barberPin} onChange={(e) => setBarberPin(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter' && barberPin === currentPin) { setIsBarberAuth(true); loadBarberData(); } }}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white text-center text-2xl tracking-widest focus:outline-none focus:border-[#c9a84c] mb-4" placeholder="----" maxLength={8} />
          <button onClick={() => { if (barberPin === currentPin) { setIsBarberAuth(true); loadBarberData(); } else { alert('PIN incorrecto'); } }}
            className="w-full px-6 py-3 bg-[#c9a84c] text-[#0a0a0a] font-bold tracking-[0.1em] hover:bg-[#d4b85c] transition-colors">INGRESAR</button>
          <button onClick={() => setPage('landing')} className="w-full mt-4 text-[#777] hover:text-white transition-colors text-sm flex items-center justify-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const allCustomers = customers;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#c9a84c]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#c9a84c]" />
            <h1 className="text-base md:text-lg font-bold text-white tracking-wide">Panel del Barbero</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadBarberData} className="px-3 py-2 bg-[#0f0f0f] border border-[#2a2a2a] text-[#999] hover:text-white hover:border-[#c9a84c] transition-colors text-xs md:text-sm font-semibold">Actualizar</button>
            <button onClick={() => setShowSettings(!showSettings)} className="px-3 py-2 bg-[#0f0f0f] border border-[#2a2a2a] text-[#999] hover:text-white hover:border-[#c9a84c] transition-colors text-xs md:text-sm font-semibold">
              <span className="hidden sm:inline">PIN</span><Settings className="w-4 h-4 sm:hidden inline" />
            </button>
            <button onClick={() => { setIsBarberAuth(false); setBarberPin(''); setPage('landing'); }} className="text-[#777] hover:text-white transition-colors text-sm">Salir</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Cambiar PIN</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-[#999] mb-2 tracking-[0.1em]">NUEVO PIN</label>
                  <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white text-center text-2xl tracking-widest focus:outline-none focus:border-[#c9a84c]" placeholder="----" maxLength={8} />
                  <p className="text-xs text-[#555] mt-1">Minimo 4 caracteres</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#999] mb-2 tracking-[0.1em]">CONFIRMAR PIN</label>
                  <input type="password" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] text-white text-center text-2xl tracking-widest focus:outline-none focus:border-[#c9a84c]" placeholder="----" maxLength={8} />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setShowSettings(false); setNewPin(''); setConfirmPin(''); }} className="flex-1 px-6 py-3 bg-[#1a1a1a] text-white font-bold hover:bg-[#2a2a2a] transition-colors">Cancelar</button>
                <button onClick={changePin} className="flex-1 px-6 py-3 bg-[#c9a84c] text-[#0a0a0a] font-bold hover:bg-[#d4b85c] transition-colors">Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#c9a84c]" />
              <span className="text-[#777] font-semibold text-sm">Pendientes</span>
            </div>
            <p className="text-4xl font-bold text-white">{loading ? '...' : pendingVisits.length}</p>
          </div>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#c9a84c]" />
              <span className="text-[#777] font-semibold text-sm">Total Clientes</span>
            </div>
            <p className="text-4xl font-bold text-white">{loading ? '...' : allCustomers.length}</p>
          </div>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-[#777] font-semibold text-sm">Validadas</span>
            </div>
            <p className="text-4xl font-bold text-white">{loading ? '...' : allCustomers.reduce((sum, c) => sum + (c.total_visits || 0), 0)}</p>
          </div>
        </div>

        {/* Pending Visits */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            <Clock className="w-5 h-5 text-[#c9a84c]" />
            Visitas Pendientes
          </h2>
          {loading ? (
            <div className="text-center py-12"><p className="text-[#777]">Cargando...</p></div>
          ) : pendingVisits.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500/30 mx-auto mb-3" />
              <p className="text-[#777]">No hay visitas pendientes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVisits.map(({ customer, visit }) => (
                <div key={visit.id} className="bg-[#0a0a0a] border border-[#2a2a2a] p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-white">{customer.first_name} {customer.last_name}</h3>
                        {visit.benefit && (
                          <span className="px-3 py-1 bg-[#c9a84c] text-[#0a0a0a] text-xs font-bold">{visit.benefit}</span>
                        )}
                      </div>
                      <div className="space-y-0.5 text-sm text-[#777]">
                        <p>{customer.email}</p>
                        <p>{customer.phone}</p>
                        <p>{new Date(visit.created_at).toLocaleString('es-AR')}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="text-[#777] text-sm">Progreso:</span>
                        <div className="flex gap-1 flex-wrap">
                          {[...Array(10)].map((_, i) => (
                            <div key={i} className={`w-5 h-5 ${i < customer.cycle_visits ? 'bg-[#c9a84c]' : 'bg-[#1a1a1a]'}`} />
                          ))}
                        </div>
                        <span className="text-white font-semibold text-sm">{customer.cycle_visits}/10</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button onClick={() => validateVisit(visit.id, customer.id, customer.cycle_visits, customer.total_visits, customer.current_cycle)}
                        className="px-4 py-3 bg-green-600 text-white font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />VALIDAR
                      </button>
                      <button onClick={() => rejectVisit(visit.id, customer.id, customer.cycle_visits)}
                        className="px-4 py-3 bg-red-600/80 text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" />RECHAZAR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Customers */}
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-4 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            <Users className="w-5 h-5 text-[#c9a84c]" />
            Todos los Clientes
          </h2>
          {loading ? (
            <div className="text-center py-12"><p className="text-[#777]">Cargando...</p></div>
          ) : allCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-[#555]/30 mx-auto mb-3" />
              <p className="text-[#777]">No hay clientes registrados</p>
            </div>
          ) : (
            <div className="space-y-4">
              {allCustomers.map((customer) => {
                const validatedVisits = (customer.visits || []).filter(v => v.status === 'validated');
                return (
                  <div key={customer.id} className="bg-[#0a0a0a] border border-[#2a2a2a] p-4 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{customer.first_name} {customer.last_name}</h3>
                        <div className="space-y-0.5 text-sm text-[#777] mb-3">
                          <p>{customer.email}</p>
                          <p>{customer.phone}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[#777]">Total: <span className="text-white font-semibold">{customer.total_visits || 0}</span></span>
                          <span className="text-[#777]">Ciclo: <span className="text-[#c9a84c] font-semibold">{customer.cycle_visits || 0}/10</span></span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-5 h-5 ${i < (customer.cycle_visits || 0) ? 'bg-[#c9a84c]' : 'bg-[#1a1a1a]'}`} />
                        ))}
                      </div>
                    </div>
                    {validatedVisits.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
                        <p className="text-[#777] text-sm mb-2">Historial de visitas validadas:</p>
                        <div className="flex flex-wrap gap-2">
                          {validatedVisits.slice(-5).reverse().map((visit) => (
                            <div key={visit.id} className="px-3 py-1 bg-[#1a1a1a] text-xs text-[#999] flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {new Date(visit.created_at).toLocaleDateString('es-AR')}
                              {visit.benefit && (<span className="text-[#c9a84c] font-semibold">- {visit.benefit}</span>)}
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
