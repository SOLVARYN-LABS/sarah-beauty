"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-4xl mb-6">Paramètres de la maison</h1>
      <form className="card-soft p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="text-xs uppercase tracking-[0.12em] block">Nom commercial
          <input className="field mt-1" defaultValue="Sarah Beauty" />
        </label>
        <label className="text-xs uppercase tracking-[0.12em] block">Annonce
          <input className="field mt-1" defaultValue="Livraison 69 wilayas • Paiement à la livraison • Garantie d'authenticité" />
        </label>
        <p className="text-sm text-muted">Les commandes, le stock et le panier sont enregistrés dans ce navigateur.</p>
        <button className="btn-dark px-5 py-3">Enregistrer</button>
      </form>
    </div>
  );
}
