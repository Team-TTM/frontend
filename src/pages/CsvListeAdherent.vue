<template>
  <div id="page-container" class="page-container">
    <div class="main-container">
      <div class="panel-adherents">
        <h1 class="titre-listeAdherents">Liste des Adhérents</h1>
        <div class="filters-container">
          <input type="text" v-model="rechercheTexte" class="recherche-input"
                 placeholder="Rechercher" @input="filtrerAdherents"
          />

          <select v-model="typeLicenceSelectionnee"  class="combobox-typeLicence" @change="filtrerAdherents">
            <option value="">Tous les types de licence ({{ totalAdherents }})</option>
            <option v-for="(label, key) in licences" :key="key" :value="key">
              {{ String(label).replace(/(Lic\. club - |Licence club - )/, '') }} ({{ occurrences[key] || 0 }})
            </option>
          </select>

          <label class="checkbox-licenceValide-container">
            <input type="checkbox" v-model="filtreLicenceValide" @change="filtrerAdherents" />
            <span>Afficher seulement les licences valides</span>
          </label>

          <div class="import-container">
            <label for="fileUpload" class="label-text">Importer un fichier :</label>
            <div class="button-container">
              <input type="file" id="fileUpload" accept=".xls,.xlsx" @change="handleFileUpload" class="file-input"/>

              <button :disabled="!file && !process" class="import-button" @click="uploadCSV"
                      :class="file ? 'active-import' : 'disabled-import'">Importer</button>
            </div>
            <p v-if="message" :class="messageType" class="status-message">{{ message }}</p>
          </div>
        </div>

        <div class="container-liste-adherent">
          <div class="table-wrapper-infos-adherents">
            <table class="table-infos-adherents">
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
                  <td>{{ adherent.prenom?.toUpperCase() }}</td>
                  <td>{{ adherent.nom }}</td>
                  <td>{{ adherent.ville }}</td>
                  <td>{{adherent.mobile}}</td>
                  <td>{{ adherent.email }}</td>
                  <td>
                      <span class="statut-lumiere-adherent"
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

import axios from "axios";
import {useMessage} from 'naive-ui';
export default {
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
      messageAlert: useMessage(),
      process: false
    };
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
    async uploadCSV() {
      this.process = true;
      const uri = "/api/import/adherent";

      if (!this.file) {

        this.message = "Veuillez sélectionner un fichier.";
        this.messageType = "error";
        this.process = false;
        return;
      }

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
          this.messageAlert.success(`Importation réussie ! ${response.data.add} ajout(s), ${response.data.update} mise(s) à jour.`);
          this.messageType = "success";
          await this.fetchAdherents();
        } else {
          console.error("Erreur de récupération :", response.status);
          this.$router.push("/");
        }
      } catch (error) {
        if (error.response) {
          this.messageAlert.error(error.response?.data.error || 'Une erreur est survenue.');
        } else if (error.request) {
          this.messageAlert.error('Problème de connexion. Veuillez réessayer plus tard.');
        } else {
          this.messageAlert.error('Une erreur inconnue est survenue.');
        }
      } finally {
        this.process = false;
      }
    },
    async fetchAdherents() {
      const uri = '/api/adherent/all';
      try {
        const token = this.$store.getters['getToken'];
        console.log(token);
        const response = await axios.get(uri, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response)
        if (response.status !== 200) {
          this.$router.push('/');
        }
        this.adherents = response.data;
        this.adherentsFiltres = [...this.adherents];

      } catch
        (error) {
        console.error('Erreur lors de la requête :', error);
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

  async mounted() {
    this.fetchAdherents()
  },

};
</script>
