# 🛡️ DYLETH — Site web

Site complet DYLETH, prêt à déployer sur Netlify.

## 📁 Structure du site

```
dyleth-site/
├── index.html               ← page d'accueil
├── style.css                ← design partagé par toutes les pages
├── robots.txt               ← pour Google
├── sitemap.xml              ← pour le référencement
│
├── menace/                  ← 4 pages "La Menace"
├── comprendre/              ← 7 pages (phishing, glossaire, etc.)
├── solution/                ← 6 pages (modules, RGPD, FAQ, etc.)
├── secteurs/                ← 16 pages (particuliers, TPE, mairies...)
├── ressources/              ← blog + livre blanc + newsletter
│   └── blog/                ← articles de blog
├── a-propos/                ← mission, charte, contact
├── rejoindre/               ← page ambassadeurs avec formulaire
└── legal/                   ← 5 pages légales
```

**Total : 49 pages.**

---

## 🚀 Comment mettre en ligne

### Étape 1 — GitHub

1. Va sur https://github.com → "New repository" → nom : `dyleth-site`
2. Clique "uploading an existing file"
3. Glisse **tout le contenu du dossier** `dyleth-site/` (pas le dossier lui-même, son contenu)
4. "Commit changes"

### Étape 2 — Netlify

1. Va sur https://netlify.com → "Add new site" → "Import from Git"
2. Choisis GitHub → sélectionne `dyleth-site`
3. Clique "Deploy"
4. C'est en ligne en 1 minute !

### Étape 3 — Connecter ton nom de domaine `dyleth.com`

Dans Netlify : Site settings → Domain management → Add custom domain → `dyleth.com`
Suis les instructions (tu devras modifier les DNS chez ton registrar).

---

## ✏️ Comment modifier les textes

### Modifier une page existante

1. Sur GitHub, ouvre le fichier (ex: `menace/etat-des-lieux.html`)
2. Clique l'icône ✏️ crayon en haut à droite
3. Modifie le texte entre les balises `<h1>`, `<p>`, etc.
4. Descends en bas → "Commit changes"
5. Netlify redéploie automatiquement

**Règle d'or :** tu modifies UNIQUEMENT le texte entre les balises. Tu ne touches pas aux `<div>`, `class=`, etc.

### Exemple : changer le titre de la page phishing

Dans `comprendre/phishing.html`, tu cherches :

```html
<h1 class="page-title">Qu'est-ce que le <em>phishing</em> ?</h1>
```

Tu remplaces par ton propre texte :

```html
<h1 class="page-title">Mon nouveau titre ici</h1>
```

---

## 📬 Formulaire Ambassadeurs — comment récupérer les candidatures

Le formulaire de la page `/rejoindre/ambassadeurs.html` utilise **Netlify Forms** (gratuit jusqu'à 100 soumissions/mois).

### Pour l'activer :
1. Une fois le site en ligne sur Netlify, va dans ton dashboard Netlify
2. Onglet "Forms"
3. Tu verras apparaître toutes les candidatures reçues
4. Dans "Form notifications", ajoute ton email pour recevoir chaque candidature par mail

---

## 🎨 Modifier les couleurs / le design

Le design de toutes les pages est dans un **seul fichier** : `style.css`

Tout en haut, tu as les couleurs :

```css
:root {
  --blue:  #0A84FF;   ← bleu principal
  --green: #30D158;   ← vert des badges GRATUIT
  --gold:  #FFD60A;   ← jaune du badge PRO
}
```

Change ces valeurs et tout le site suit.

---

## 📝 Pages avec "Textes à venir"

Les pages suivantes ont juste le titre + un placeholder "Contenu en cours de rédaction".
**Tu as juste à remplacer le bloc `<div class="coming-soon">...</div>` par ton vrai contenu.**

- Toutes les pages dans `menace/`, `comprendre/`, `solution/`, `secteurs/`, `a-propos/`, `legal/`
- Les 3 articles dans `ressources/blog/`

**Ne touche pas :**
- `index.html` (accueil, déjà complet)
- `rejoindre/ambassadeurs.html` (formulaire déjà prêt)

---

## 🆘 Besoin d'aide ?

Si tu casses quelque chose accidentellement : GitHub garde l'historique de TOUS les changements. Tu peux revenir à une version précédente en 1 clic dans l'onglet "History" du fichier.

---

© 2026 DYLETH — Société Française de Cybersécurité
