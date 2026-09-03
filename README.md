# Learny — Blog personnel (Next.js)

Blog perso pour partager ce que j'apprends et mon expérience en développement web fullstack. Pas de BDD prévue : les articles sont des fichiers (Markdown/MDX) versionnés dans le repo.

> Ce README est un document de travail. On le complète ensemble au fil des échanges, avant d'écrire du code. Les sections "❓ À trancher" sont les points ouverts.

## 1. Objectif

- Publier des articles techniques (retours d'expérience, notes d'apprentissage, tutoriels) sur le dev web fullstack.
- Rester simple à écrire et à maintenir : un article = un fichier Markdown.
- Pas de backend/BDD nécessaire pour le moment → site statique ou majoritairement statique.

## 2. Stack envisagée

- **Framework** : Next.js (App Router)
- **Langage** : TypeScript
- **Contenu** : fichiers MDX (Markdown + composants React) dans le repo, ex. `content/posts/*.mdx`
- **Rendu** : génération statique (SSG) — pas de fetch BDD, tout est lu au build
- **Style** : Tailwind CSS
- **Déploiement** : Vercel

## 3. Structure de contenu (proposition)

```
content/
  posts/
    2026-09-03-mon-premier-article.mdx
```

Frontmatter par article (proposition) :

```md
---
title: "Titre de l'article"
date: "2026-09-03"
description: "Résumé court pour la liste et le SEO"
category: "PHP"
tags: ["symfony", "laravel", "solid"]
draft: false
---

Contenu de l'article en MDX...
```

### Catégories vs tags

Distinction proposée (à valider en usage) :

- **Catégorie** : classement large et unique par article, sert à la navigation principale du blog. Ex. `Admin sys`, `PHP`, `HTML`, `CSS`, `JavaScript`, `Architecture`...
- **Tags** : mots-clés plus précis, un article peut en avoir plusieurs. Ex. `symfony`, `laravel`, `SOLID`, `docker`, `nextjs`...

❓ UX à affiner une fois qu'on aura quelques articles réels : page dédiée par catégorie (`/categorie/php`), filtre par tag sur la liste d'articles, ou les deux ? On tranchera ça au moment de construire la page de listing.

## 4. Fonctionnalités envisagées

- [ ] Page d'accueil : liste des articles (titre, date, résumé)
- [ ] Page article : rendu du Markdown, date, tags
- [ ] Filtrage/navigation par tag et par catégorie
- [ ] Page "À propos"
- [ ] SEO de base (meta title/description, Open Graph)
- [ ] Flux RSS
- [ ] Mode sombre / clair
- [ ] Coloration syntaxique du code dans les articles
- [ ] Temps de lecture estimé

*(à ajuster : on garde ce qui est utile pour un v1, on retire le reste)*

## 5. Hors scope (v1)

- Pas de BDD, pas de CMS, pas de back-office d'édition
- Pas de commentaires (sauf besoin exprimé plus tard, ex. via un service externe)
- Pas d'authentification / espace membre

## 6. ❓ À trancher ensemble

- [x] Markdown simple ou MDX → **MDX**
- [x] Librairie de style → **Tailwind CSS**
- [x] TypeScript ou JavaScript → **TypeScript**
- [x] Hébergement → **Vercel**
- [x] Catégories/tags → **prévus dès le v1** (catégorie unique + tags multiples par article, voir section 3)
- [x] Design → **minimaliste**, pas d'images de couverture par article
- [x] Langue → **mono-langue FR** pour le v1, pas d'i18n (voir note ci-dessous)
- [ ] UX précise catégories/tags : pages dédiées, filtres, ou les deux ?

**Note i18n** : écarté pour le v1 — coût récurrent (traduire chaque article, gérer routing par locale, hreflang, UI traduite) pour un bénéfice hypothétique sur un blog perso qui démarre. Si un article mérite une version EN plus tard, on l'ajoutera ponctuellement (article séparé + lien croisé) sans mettre en place une architecture i18n complète.

## 7. Prochaines étapes

1. Trancher les points de la section 6
2. Initialiser le projet Next.js
3. Mettre en place la lecture des fichiers Markdown + rendu d'une page article
4. Page liste des articles
5. Style de base
6. Déploiement
