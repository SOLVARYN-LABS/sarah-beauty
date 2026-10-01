"use client";

import { useState } from "react";

export default function ComptePage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="font-serif text-5xl">Le Club Sarah</h1>
      <p className="text-muted mt-3">Laissez votre e-mail pour les avant-premières. Le suivi de commande reste disponible avec votre numéro de commande.</p>
      {sent ? (
        <p className="mt-6 text-success">Merci. Vous êtes sur la liste de la maison.</p>
      ) : (
        <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input required type="email" placeholder="vous@email.com" className="field" />
          <button className="btn-dark px-6 py-3">Adhérer</button>
        </form>
      )}
    </div>
  );
}
