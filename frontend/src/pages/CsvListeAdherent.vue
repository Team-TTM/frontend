  <template>
    <div id="page-container">

      <header>
        <LogoTTM/>
        <boutons-header/>
      </header>
      <div class="main-container">
        <h1 class="titre">Liste des Adhérents</h1>
        <div class="panel-adherents">
          <div class="filters-container">
            <input
              type="text"
              v-model="rechercheTexte"
              class="recherche-input"
              placeholder="Rechercher"
              @input="filtrerAdherents"
            />
            <select ref="combobox" v-model="pratiqueSelectionnee"  class="combobox" @change="filtrerAdherents">
              <option value="">Toutes les pratiques</option>
              <option value="Compétition occasionnelle">Compétition occasionnelle</option>
              <option value="Compétition de manière régulière">Compétition de manière régulière</option>
              <option value="Ne pratique pas">Ne pratique pas</option>
              <option value="Entrainement">Entrainement</option>
            </select>

            <label class="checkbox-container">
              <input type="checkbox" v-model="filtreLicenceValide" @change="filtrerAdherents" />
              <span>Afficher seulement les licences valides</span>
            </label>
          </div>

          <div class="container-liste-adherent">
            <div class="table-wrapper">
              <table class="table">
                <thead>
                <tr>
                  <th @click="trierAdherents('numeroLicence')"
                      :class="{'trie-asc': colonneTriee === 'numeroLicence' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'numeroLicence' && !ordreTriAscendant}">
                    Numéro Licence
                  </th>

                  <th @click="trierAdherents('prenom')"
                      :class="{'trie-asc': colonneTriee === 'prenom' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'prenom' && !ordreTriAscendant}">
                    Prénom
                  </th>

                  <th @click="trierAdherents('nom')"
                      :class="{'trie-asc': colonneTriee === 'nom' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'nom' && !ordreTriAscendant}">
                    Nom
                  </th>

                  <th @click="trierAdherents('ville')"
                      :class="{'trie-asc': colonneTriee === 'ville' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'ville' && !ordreTriAscendant}">
                    Ville
                  </th>

                  <th @click="trierAdherents('mobile')"
                      :class="{'trie-asc': colonneTriee === 'mobile' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'mobile' && !ordreTriAscendant}">
                    Mobile
                  </th>

                  <th @click="trierAdherents('email')"
                      :class="{'trie-asc': colonneTriee === 'email' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'email' && !ordreTriAscendant}">
                    Email
                  </th>

                  <th @click="trierAdherents('statut')"
                      :class="{'trie-asc': colonneTriee === 'statut' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'statut' && !ordreTriAscendant}">
                    Statut
                  </th>
                  <th class="non-triable">  Actions</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="adherent in adherentsFiltres" :key="adherent.numeroLicence">
                <tr class="info-adherent-container">
                    <td>{{ adherent.numeroLicence }}</td>
                    <td>{{ adherent.prenom.toUpperCase() }}</td>
                    <td>{{ adherent.nom }}</td>
                    <td>{{ adherent.ville }}</td>
                    <td>{{ afficherTelephoneMobile(adherent.mobile) }}</td>
                    <td>{{ adherent.email }}</td>

                    <td>
                      <span class="statut-lumiere"
                            :class="{'statut-actif': adherent.statut, 'statut-inactif': !adherent.statut}"></span>
                    </td>
                    <td class="btn-afficherDetails">
                      <button class="btn-afficherDetails" @click="afficherDetails(adherent.numeroLicence)">
                        {{ adherentSelectionne === adherent.numeroLicence ? '-' : '+' }}
                      </button>
                    </td>
                  </tr>

                  <tr v-if="adherentSelectionne === adherent.numeroLicence">
                    <td colspan="10" class="details-cell">
                      <div class="details-container">
                        <div class="details-colonne">
                          <p><strong>Téléphone :</strong> {{ adherent.telephone }}</p>
                          <p><strong>Pratique :</strong> {{ adherent.pratique }}</p>
                          <p><strong>Année Blanche:</strong> {{ convertirAnneeBlanche(adherent.anneeBlanche) }}</p>
                          <p><strong>Date de Naissance:</strong> {{ formatDate(adherent.dateNaissance) }}</p>
                          <p><strong>Sexe :</strong> {{ convertirSexe(adherent.sexe) }}</p>
                          <p><strong>Profession :</strong> {{ adherent.profession }}</p>
                          <p><strong>Saison :</strong> {{ adherent.saison.join(", ") }}</p>
                          <p><strong>Demi-Tarif :</strong> {{ convertirBoolenEnOuiNon(adherent.demiTarif) }}</p>

                        </div>
                        <div class="details-colonne">
                          <p><strong>Catégorie :</strong> {{ adherent.categorie }}</p>
                          <p><strong>Nom d'usage :</strong> {{ adherent.nomUsage }}</p>
                          <p><strong>Adresse Principale :</strong> {{ adherent.principale }}</p>
                          <p><strong>Lieu dit :</strong> {{ adherent.lieuDit }}</p>
                          <p><strong>Code postal :</strong> {{ adherent.codePostal }}</p>
                          <p><strong>Pays:</strong> {{ adherent.pays }}</p>
                          <p><strong>Hors Club :</strong> {{ convertirBoolenEnOuiNon(adherent.horsClub) }}</p>
                          <p><strong>Urgence Téléphone :</strong> {{ adherent.urgenceTelephone }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer>
        © 2025 - Site TTM | Auteur | Support
      </footer>
    </div>
  </template>

  <script>

  import LogoTTM from "@/components/LogoTTM.vue";
  import axios from "axios";
  import BoutonsHeader from "@/components/boutonsHeader.vue";
  export default {
    components: {BoutonsHeader, LogoTTM},
    data() {
      return {
        adherents: [/*
          {
            numeroLicence: "B81769C7180418MCAFRA", prenom: "Jean", nom: "Dupont", statut: true, type: "Standard", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Dupont", dateNaissance: "1985-03-22", sexe: "Homme", profession: "Ingénieur", adressePrincipale: "1 rue de Paris", details: "Appartement 12", lieuDit: "Quartier du Parc", codePostal: "75001", ville: "Paris", pays: "France", telephone: "01 23 45 67 89", mobile: "6 12 34 56 78", email: "jean.dupont@example.com", urgenceTelephone: "06 98 76 54 32", saison: ["2023/2024", "2024/2025"]
          },
          {
            numeroLicence: "B789012C654321MRAFRA", prenom: "Sophie", nom: "Martin", statut: true, type: "Pro", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Ne pratique pas", nomUsage: "Martin", dateNaissance: "2002-07-14", sexe: "Femme", profession: "Étudiante", adressePrincipale: "22 rue des Lilas", details: "Bâtiment A", lieuDit: "Quartier Saint-Pierre", codePostal: "69001", ville: "Lyon", pays: "France", telephone: "04 56 78 90 12", mobile: "6 23 45 67 89", email: "sophie.martin@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"]
          },
          {
            numeroLicence: "B34567C8901234MRAFRA", prenom: "Paul", nom: "Lemoine", statut: false, type: "Standard", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Lemoine", dateNaissance: "1978-11-05", sexe: "Homme", profession: "Médecin", adressePrincipale: "45 avenue de la République", details: "Appartement 3", lieuDit: "Centre-ville", codePostal: "13001", ville: "Marseille", pays: "France", telephone: "01 44 55 66 77", mobile: "6 76 54 32 10", email: "paul.lemoine@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"]
          }*/
        ],
        adherentsFiltres: [],
        adherentSelectionne: null,
        pratiqueSelectionnee: "",
        filtreLicenceValide: false,
        rechercheTexte: "",
        colonneTriee: null,
        ordreTriAscendant: true, // Sens du tri (true = ascendant, false = descendant)
      };
    },
    methods: {
      afficherDetails(numeroLicence) {
        this.adherentSelectionne = this.adherentSelectionne === numeroLicence ? null : numeroLicence;
      },
      afficherTelephoneMobile(mobile) {
        if (mobile.length <= 1) {
          return "";
        }
        if (mobile.startsWith("-")) {
          mobile = mobile.slice(1);
        }

        if (mobile.startsWith("33")) {
          mobile = mobile.slice(2);
        }
        return "0" + mobile;
      },
      formatDate(objDate) {
        const date = new Date(objDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
      },
      convertirBoolenEnOuiNon(value) {
        return value ? 'Oui' : 'Non';
      },
      convertirSexe(sexe) {
        if (sexe === 'F') {
          return 'Femme';
        } else if (sexe === 'M') {
          return 'Homme';
        } else {
          return 'Inconnu';
        }
      },
      convertirAnneeBlanche(value) {
        return value >= 1 ? value : 'Aucune';
      },
      filtrerAdherents() {
        let filteredAdherents = [...this.adherents];

        // Appliquer le filtre de la pratique
        if (this.pratiqueSelectionnee) {
          filteredAdherents = filteredAdherents.filter(adherent => adherent.pratique === this.pratiqueSelectionnee);
        }

        // Appliquer le filtre de la licence valide
        if (this.filtreLicenceValide) {
          filteredAdherents = filteredAdherents.filter(adherent => adherent.statut);
        }

        // Appliquer le filtre de recherche (par nom, prénom ou numéro de licence)
        if (this.rechercheTexte) {
          const searchText = this.rechercheTexte.toLowerCase();
          filteredAdherents = filteredAdherents.filter(adherent => {
            const nomPrenomLicence = `${adherent.prenom.toLowerCase()} ${adherent.nom.toLowerCase()} ${adherent.numeroLicence.toLowerCase()} ${adherent.email.toLowerCase()} ${adherent.ville.toLowerCase()}`;
            return nomPrenomLicence.includes(searchText);
          });
        }

        // Mettre à jour adherentsFiltres
        this.adherentsFiltres = filteredAdherents;
      },

      trierAdherents(colonne) {
        if (this.colonneTriee === colonne) {
          // Si on clique sur la même colonne, on inverse l'ordre
          this.ordreTriAscendant = !this.ordreTriAscendant;
        } else {
          // Sinon, on définit la nouvelle colonne et on tri en ordre croissant par défaut
          this.colonneTriee = colonne;
          this.ordreTriAscendant = true;
        }

        // Tri des adhérents
        this.adherentsFiltres.sort((a, b) => {
          let valeurA = a[colonne];
          let valeurB = b[colonne];

          // Si c'est un tableau (ex: saison), on prend le dernier élément pour trier
          if (Array.isArray(valeurA)) valeurA = valeurA[valeurA.length - 1];
          if (Array.isArray(valeurB)) valeurB = valeurB[valeurB.length - 1];


          // Comparaison des valeurs
          if (typeof valeurA === "string") valeurA = valeurA.toLowerCase();
          if (typeof valeurB === "string") valeurB = valeurB.toLowerCase();

          if (valeurA > valeurB) return this.ordreTriAscendant ? 1 : -1;
          if (valeurA < valeurB) return this.ordreTriAscendant ? -1 : 1;
          return 0;
        });
      }
    },

    async mounted() {
      const uri = "/users/getAllAdherents";
      try {
        const token = this.$store.getters['getToken'];
        console.log(token);
        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        this.adherents = response.data;
        this.adherentsFiltres = [...this.adherents];
      }
      catch
        (error)
      {
        console.error("Erreur lors de la requête :", error);
      }
    }
    /*async mounted() {
      try {
        this.adherentsFiltres = [...this.adherents];
      } catch (error) {
        console.error("Erreur :", error);
      }
    }*/
  };
  </script>

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

  .titre {
    position:relative;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 12px 24px;
    margin-top:5px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
  }



  .panel-adherents {
    margin-top: 105px;
    width: 95%;
    max-width: 1400px;
    max-height: 450px;
    height: 75vh;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
  }

  .filters-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }



  .combobox {
    padding: 8px; /* Ajoute un espace intérieur */
    font-size: 16px; /* Définit la taille du texte */
    border: 1px solid #ccc; /* Ajoute une bordure */
    border-radius: 5px; /* Arrondit les coins */
    width: auto; /* Permet à la boîte de s'ajuster au texte */
    text-align: center;
  }

  .checkbox-container {

    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .checkbox-container input {
    margin-right: 8px;
  }

  .table {
    width: 100%;
    top: 100px;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }



  th {
    cursor: pointer;
    position: relative;
    padding: 10px;
    user-select: none;
    border-radius: 5px; /* Coins arrondis */
    transition: all 0.2s ease-in-out;
  }

  th:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Léger fond au survol */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Ombre légère */
  }

  th.trie-asc, th.trie-desc {
    background-color: rgba(0, 0, 0, 0.15); /* Couleur plus marquée pour la colonne triée */
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3); /* Ombre plus prononcée */
  }

  th::after {
    content: " ⬍";
    font-size: 12px;
    position: absolute;
    right: 10px;
    opacity: 0.5;
  }

  th.trie-asc::after {
    content: " ⬆";
    opacity: 1;
  }

  th.trie-desc::after {
    content: " ⬇";
    opacity: 1;
  }
  th.non-triable {
    cursor: default; /* Ne pas montrer la main */
    background-color: white; /* Garde la couleur normale */
    transition: none; /* Pas d'effet au survol */
  }

  th.non-triable::after {
    content: ""; /* Aucune icône */
  }


  td {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f3f4f6;
  }

  tr:hover {
    background-color: #e2e8f0;
    transition: background 0.3s ease;
  }
  .table-wrapper {
    max-height: 60vh;
    overflow-y: auto;
  }
  .table-wrapper::-webkit-scrollbar {
    width: 8px;
  }

  .table-wrapper::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  .table-wrapper::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .details-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .details-colonne {
    width: 48%;
  }

  .details-colonne p {
    margin: 5px 0;
  }

  .statut-lumiere {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin: auto;
  }

  .statut-actif {
    background-color: green;
    box-shadow: 0 0 8px rgba(0, 128, 0, 0.8);
  }

  .statut-inactif {
    background-color: red;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
  }
  header a {
    display: inline-block; /* Permet de conserver la taille de l'image */
  }

  .recherche-input {
    width: 100%;
    max-width: 200px; /* Limite la largeur de la barre de recherche */
    padding: 10px 20px; /* Espacement interne pour rendre le texte plus lisible */
    font-size: 16px; /* Taille du texte */
    border: 2px solid #ccc; /* Bordure grise */
    border-radius: 30px; /* Coins arrondis */
    background-color: #f9f9f9; /* Couleur de fond claire */
    transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Effet de transition pour les changements */
    outline: none; /* Enlève l'effet de contour par défaut */
  }

  .recherche-input:focus {
    border-color: #4CAF50; /* Bordure verte quand l'input est sélectionné */
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.4); /* Ombre autour de l'input */
  }

  .recherche-input::placeholder {
    color: #aaa; /* Couleur du texte de placeholder */
    font-style: italic; /* Style en italique */
  }
  </style>
