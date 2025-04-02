<template>
  <div id="page-container" class="page-container">
    <Header/>
    <div class="main-container">
      <h1 class="titre">Liste des Adhérents</h1>
      <div class="panel-adherents">

        <div class="filters-container">
          <input type="text" v-model="rechercheTexte" class="recherche-input"
                 placeholder="Rechercher" @input="filtrerAdherents"
          />

          <select ref="combobox" v-model="typeLicenceSelectionnee"  class="combobox" @change="filtrerAdherents">
            <option value="">Tous les types de licence ({{ totalAdherents }})</option>
            <option v-for="(label, key) in licences" :key="key" :value="key">
              {{ label.replace(/(Lic\. club - |Licence club - )/, '') }} ({{ occurrences[key] || 0 }})
            </option>
          </select>

          <label class="checkbox-container">
            <input type="checkbox" v-model="filtreLicenceValide" @change="filtrerAdherents" />
            <span>Afficher seulement les licences valides</span>
          </label>

          <div class="import-container">
            <label for="fileUpload" class="label-text">Importer un fichier :</label>
            <div class="button-container">
              <input type="file" id="fileUpload" accept=".xls,.xlsx" @change="handleFileUpload" class="file-input"/>

              <button @click="uploadCSV" :disabled="!file" class="import-button"
                      :class="file ? 'active-import' : 'disabled-import'">Importer</button>
            </div>
            <div v-if="isLoading" class="loader"></div>
            <p v-if="!isLoading && message" :class="messageType" class="status-message">{{ message }}</p>
          </div>
        </div>

        <div class="container-liste-adherent">
          <div class="table-wrapper">
            <table class="table">
              <thead>
              <tr>
                <th @click="trierAdherents('numeroLicence')" :class="{'trie-asc': colonneTriee === 'numeroLicence' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'numeroLicence' && !ordreTriAscendant}">
                  Numéro Licence
                </th>

                <th @click="trierAdherents('prenom')" :class="{'trie-asc': colonneTriee === 'prenom' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'prenom' && !ordreTriAscendant}">
                  Prénom
                </th>

                <th @click="trierAdherents('nom')" :class="{'trie-asc': colonneTriee === 'nom' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'nom' && !ordreTriAscendant}">
                  Nom
                </th>

                <th @click="trierAdherents('ville')" :class="{'trie-asc': colonneTriee === 'ville' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'ville' && !ordreTriAscendant}">
                  Ville
                </th>

                <th :class="{'trie-asc': colonneTriee === 'telephone' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'telephone' && !ordreTriAscendant}"
                    @click="trierAdherents('telephone')">
                  Mobile
                </th>

                <th @click="trierAdherents('email')" :class="{'trie-asc': colonneTriee === 'email' && ordreTriAscendant,
               'trie-desc': colonneTriee === 'email' && !ordreTriAscendant}">
                  Email
                </th>

                <th @click="trierAdherents('statut')" :class="{'trie-asc': colonneTriee === 'statut' && ordreTriAscendant,
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
                  <td>{{adherent.mobile}}</td>
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
                        <p><strong>Type de licence :</strong> {{ convertirTypeLicence(adherent.type) }}</p>
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
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  components: {Header: HeaderComponent, BoutonsHeader, LogoTTM},
  data() {
    return {
      adherents: [/*
        {
          numeroLicence: "B81769C7180418MCAFRA", prenom: "Jean", nom: "Dupont", statut: true, type: "B - Lic. club - Compétition - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Dupont", dateNaissance: "1985-03-22", sexe: "Homme", profession: "Ingénieur", adressePrincipale: "1 rue de Paris", details: "Appartement 12", lieuDit: "Quartier du Parc", codePostal: "75001", ville: "Paris", pays: "France", telephone: "01 23 45 67 89", mobile: "6 12 34 56 78", email: "jean.dupont@example.com", urgenceTelephone: "06 98 76 54 32", saison: ["2023/2024", "2024/2025"]
        },
        {
          numeroLicence: "B789012C654321MRAFRA", prenom: "Sophie", nom: "Martin", statut: true, type: "A - Lic. club - Compétition - Jeune", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Ne pratique pas", nomUsage: "Martin", dateNaissance: "2002-07-14", sexe: "Femme", profession: "Étudiante", adressePrincipale: "22 rue des Lilas", details: "Bâtiment A", lieuDit: "Quartier Saint-Pierre", codePostal: "69001", ville: "Lyon", pays: "France", telephone: "04 56 78 90 12", mobile: "6 23 45 67 89", email: "sophie.martin@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"]
        },
        {
          numeroLicence: "B34567C8901234MRAFRA", prenom: "Paul", nom: "Lemoine", statut: false, type: "D - Licence club - Loisir - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Lemoine", dateNaissance: "1978-11-05", sexe: "Homme", profession: "Médecin", adressePrincipale: "45 avenue de la République", details: "Appartement 3", lieuDit: "Centre-ville", codePostal: "13001", ville: "Marseille", pays: "France", telephone: "01 44 55 66 77", mobile: "6 76 54 32 10", email: "paul.lemoine@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"]
        },{
          numeroLicence: "B4576107180418LCAFRA", prenom: "Luc", nom: "Leroux", statut: true, type: "B - Lic. club - Compétition - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Dupont", dateNaissance: "1985-03-22", sexe: "Homme", profession: "Ingénieur", adressePrincipale: "1 rue de Paris", details: "Appartement 12", lieuDit: "Quartier du Parc", codePostal: "75001", ville: "Paris", pays: "France", telephone: "01 23 45 67 89", mobile: "6 12 34 56 78", email: "jean.dupont@example.com", urgenceTelephone: "06 98 76 54 32", saison: ["2023/2024", "2024/2025"]
        },
        {
          numeroLicence: "B749012C654321MRAFRA", prenom: "Sophie", nom: "Eric", statut: true, type: "A - Lic. club - Loisir - Jeune", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Ne pratique pas", nomUsage: "Martin", dateNaissance: "2002-07-14", sexe: "Femme", profession: "Étudiante", adressePrincipale: "22 rue des Lilas", details: "Bâtiment A", lieuDit: "Quartier Saint-Pierre", codePostal: "69001", ville: "Lyon", pays: "France", telephone: "04 56 78 90 12", mobile: "6 23 45 67 89", email: "sophie.martin@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"]
        },
        {
          numeroLicence: "B34517C8901234MRAFRA", prenom: "Romain", nom: "Jean", statut: false, type: "D - Licence club - Loisir - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Lemoine", dateNaissance: "1978-11-05", sexe: "Homme", profession: "Médecin", adressePrincipale: "45 avenue de la République", details: "Appartement 3", lieuDit: "Centre-ville", codePostal: "13001", ville: "Marseille", pays: "France", telephone: "01 44 55 66 77", mobile: "6 76 54 32 10", email: "paul.lemoine@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"]
        },{
          numeroLicence: "B41769C7180418MCAFRA", prenom: "Jean", nom: "Dupont", statut: true, type: "B - Lic. club - Compétition - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Dupont", dateNaissance: "1985-03-22", sexe: "Homme", profession: "Ingénieur", adressePrincipale: "1 rue de Paris", details: "Appartement 12", lieuDit: "Quartier du Parc", codePostal: "75001", ville: "Paris", pays: "France", telephone: "01 23 45 67 89", mobile: "6 12 34 56 78", email: "jean.dupont@example.com", urgenceTelephone: "06 98 76 54 32", saison: ["2023/2024", "2024/2025"]
        },
        {
          numeroLicence: "B789012C654321MRAFRA", prenom: "Sophie", nom: "Martin", statut: true, type: "A - Lic. club - Compétition - Jeune", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Ne pratique pas", nomUsage: "Martin", dateNaissance: "2002-07-14", sexe: "Femme", profession: "Étudiante", adressePrincipale: "22 rue des Lilas", details: "Bâtiment A", lieuDit: "Quartier Saint-Pierre", codePostal: "69001", ville: "Lyon", pays: "France", telephone: "04 56 78 90 12", mobile: "6 23 45 67 89", email: "sophie.martin@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"]
        },
        {
          numeroLicence: "A34567C8901234MRAFRA", prenom: "Paul", nom: "Lemoine", statut: false, type: "D - Licence club - Loisir - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Lemoine", dateNaissance: "1978-11-05", sexe: "Homme", profession: "Médecin", adressePrincipale: "45 avenue de la République", details: "Appartement 3", lieuDit: "Centre-ville", codePostal: "13001", ville: "Marseille", pays: "France", telephone: "01 44 55 66 77", mobile: "6 76 54 32 10", email: "paul.lemoine@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"]
        },{
          numeroLicence: "C1576107180418LCAFRA", prenom: "Luc", nom: "Leroux", statut: true, type: "B - Lic. club - Compétition - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Dupont", dateNaissance: "1985-03-22", sexe: "Homme", profession: "Ingénieur", adressePrincipale: "1 rue de Paris", details: "Appartement 12", lieuDit: "Quartier du Parc", codePostal: "75001", ville: "Paris", pays: "France", telephone: "01 23 45 67 89", mobile: "6 12 34 56 78", email: "jean.dupont@example.com", urgenceTelephone: "06 98 76 54 32", saison: ["2023/2024", "2024/2025"]
        },
        {
          numeroLicence: "C654012C654321MRAFRA", prenom: "Sophie", nom: "Eric", statut: true, type: "A - Lic. club - Loisir - Jeune", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Ne pratique pas", nomUsage: "Martin", dateNaissance: "2002-07-14", sexe: "Femme", profession: "Étudiante", adressePrincipale: "22 rue des Lilas", details: "Bâtiment A", lieuDit: "Quartier Saint-Pierre", codePostal: "69001", ville: "Lyon", pays: "France", telephone: "04 56 78 90 12", mobile: "6 23 45 67 89", email: "sophie.martin@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"]
        },
        {
          numeroLicence: "D75417C8901234MRAFRA", prenom: "Romain", nom: "Jean", statut: false, type: "D - Licence club - Loisir - S. & V.", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Compétition de manière régulière", nomUsage: "Lemoine", dateNaissance: "1978-11-05", sexe: "Homme", profession: "Médecin", adressePrincipale: "45 avenue de la République", details: "Appartement 3", lieuDit: "Centre-ville", codePostal: "13001", ville: "Marseille", pays: "France", telephone: "01 44 55 66 77", mobile: "6 76 54 32 10", email: "paul.lemoine@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"]
        }*/
      ],
      licences: {
        "A - Lic. club - Compétition - Jeune": "A - Lic. club - Compétition - Jeune",
        "B - Lic. club - Compétition - S. & V.": "B - Lic. club - Compétition - S. & V.",
        "C - Lic. club - Loisir - Jeune": "C - Lic. club - Loisir - Jeune",
        "D - Licence club - Loisir - S. & V.": "D - Licence club - Loisir - S. & V.",
        "F - Paratriathlon - Lic. club - Compétition  - S. & V.": "F - Paratriathlon - Lic. club - Compétition  - S. & V.",
        "G - Lic. club - Dirigeant": "G - Lic. club - Dirigeant"
      },
      adherentsFiltres: [],
      adherentSelectionne: null,
      typeLicenceSelectionnee: "",
      filtreLicenceValide: false,
      rechercheTexte: "",
      colonneTriee: null,
      ordreTriAscendant: true, // Sens du tri (true = ascendant, false = descendant)
      file: null,
      message: "",
      messageType: "", // success ou error
      isLoading: false,
    };
  },
  async mounted() {
    await this.getallAdherents();
    await this.uploadCSV();
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    afficherDetails(numeroLicence) {
      this.adherentSelectionne = this.adherentSelectionne === numeroLicence ? null : numeroLicence;
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
    convertirTypeLicence(type) {
      if (type.includes("Compétition - S. & V.")) {
        return "Compétition - S. & V.";
      } else if (type.includes("Compétition - Jeune")) {
        return "Compétition - Jeune";
      } else if (type.includes("Loisir - S. & V.")) {
        return "Loisir - S. & V.";
      } else if (type.includes("Loisir - Jeune")) {
        return "Loisir - Jeune";
      } else if (type.includes("Paratriathlon - Lic. club - Compétition  - S. & V.")) {
        return "Paratriathlon - Compétition  - S. & V.";
      } else if (type.includes("Paratriathlon - Lic. club - Compétition - Jeune")) {
        return "Paratriathlon - Compétition - Jeune";
      } else if (type.includes("Paratriathlon - Lic. club - Loisir  - S. & V.")) {
        return "Paratriathlon - Loisir  - S. & V.";
      } else if (type.includes("Paratriathlon - Lic. club - Loisir - Jeune")) {
        return "Paratriathlon - Loisir - Jeune";
      } else if (type.includes("Dirigeant")) {
        return "Dirigeant";
      }
      return "Inconnu";
    },
    filtrerAdherents() {
      let filteredAdherents = [...this.adherents];

      // Appliquer le filtre de la pratique
      if (this.typeLicenceSelectionnee) {
        filteredAdherents = filteredAdherents.filter(adherent => adherent.type === this.typeLicenceSelectionnee);
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
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(event);
    },
    async getallAdherents() {
      const uri = "/users/getAllAdherents";
      try {
        const token = this.$store.getters["getToken"];
        console.log(token);

        if (!token) {
          alert("Veuillez vous connecter voir les adhérents.");
          this.$router.push("/");
          return;
        }
        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status !== 200) {
          this.$router.push('/');
        }
        this.adherents = response.data;
        this.adherentsFiltres = [...this.adherents];

      } catch
        (error) {
        console.error("Erreur lors de la requête :", error);
      }
    },
    async uploadCSV() {
      const uri = "/api/import/adherent";

      if (!this.file) {
        this.message = "Veuillez sélectionner un fichier.";
        this.messageType = "error";
        return;
      }
      this.isLoading = true;
      let formData = new FormData();
      formData.append("excel", this.file); // Doit correspondre à "excel" défini dans l'OpenAPI

      try {
        const token = this.$store.getters['getToken'];
        console.log(token);

        const response = await axios.post(uri, {excel: this.file}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log(response.status);
        if (response.status === 200) {
          this.message = `Importation réussie ! ${response.data.add} ajout(s), ${response.data.update} mise(s) à jour.`;
          this.messageType = "success";
          await this.getallAdherents();
        } else {
          console.error("Erreur de récupération :", response.status);
          this.$router.push("/");
        }

      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              this.message = "Erreur de format ou données invalides.";
              break;
            case 401:
              this.message = "Non autorisé. Vérifiez votre connexion.";
              break;
            case 500:
              this.message = "Erreur interne du serveur.";
              break;
            default:
              this.message = "Une erreur inconnue est survenue.";
          }
        } else {
          this.message = "Impossible de contacter le serveur.";
        }
        this.messageType = "error";
      } finally {
        this.isLoading = false; // Cache le loader une fois fini
      }
    }
  },
  computed: {
    occurrences() {
      // Compte le nombre d'adhérents par type de licence
      return this.adherents.reduce((acc, adherent) => {
        acc[adherent.type] = (acc[adherent.type] || 0) + 1;
        return acc;
      }, {});
    },
    totalAdherents() {
      return this.adherents.length;
    },
  },

  /*async mounted() {
    try {
      await this.uploadCSV();
      this.adherentsFiltres = [...this.adherents];
    } catch (error) {
      console.error("Erreur :", error);
    }
  },*/
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Playfair+Display:wght@700&display=swap');


.page-container {
  overflow: auto;
}
.titre {
  position: relative;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 8px 22px;
  margin-top: 30px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #2C3E50; /* Bleu profond */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  border: 2px solid #2c3e50; /* Doré doux */
  z-index: 1000;
  letter-spacing: 1px;
}

.panel-adherents {
  margin-top:10px;
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

/* Ajouter une barre de défilement personnalisée pour une meilleure expérience utilisateur */
.filters-container::-webkit-scrollbar {
  height: 8px; /* Hauteur de la barre de défilement */
}

.filters-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); /* Couleur du "thumb" de la barre */
  border-radius: 4px;
}

.filters-container::-webkit-scrollbar-track {
  background-color: transparent; /* Couleur du fond de la barre */
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

thead {
  position: sticky;
  top: 0;
  background: white; /* S'assurer que l'en-tête ne soit pas transparent */
  z-index: 10; /* Mettre l'en-tête au-dessus du reste */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optionnel: Ajoute une ombre pour démarquer l'en-tête */
}

th {
  position: sticky;
  cursor: pointer;
  top: 0;
  z-index: 10; /* Mettre l'en-tête au-dessus du reste */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optionnel: Ajoute une ombre pour démarquer l'en-tête */
  padding: 10px;
  user-select: none;
  border-radius: 5px;
  background: #f3f4f6; /* Couleur de fond */
  text-align: left;
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
  max-height: 500px;
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


/* Conteneur principal */
.import-container {
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Label */
.label-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4B5563;
  margin-bottom: 0.5rem;
}

/* Conteneur des boutons */
.button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

/* Input file invisible */
.file-input {
  padding: 0.5rem 1rem;
  background-color: #2563EB;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.file-input:hover {
  background-color: #1D4ED8;
}

/* Bouton Importer */
.import-button {
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

/* État actif du bouton Importer */
.active-import {
  background-color: #10B981;
  color: white;
}

.active-import:hover {
  background-color: #059669;
}

/* État désactivé du bouton Importer */
.disabled-import {
  background-color: #D1D5DB;
  color: #6B7280;
  cursor: not-allowed;
}

.disabled-import:hover {
  background-color: #D1D5DB;
}

/* Message de statut */
.status-message {
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db; /* Bleu */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 10px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>
