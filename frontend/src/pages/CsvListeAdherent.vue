<template>
  <header>
    <LogoTTM/>
  </header>

  <div class="main-container">
    <h1 class="titre">Liste des Adhérents</h1>

    <div class="panel-adherents">
      <div class="container-liste-adherent">
        <div class="table-wrapper">
          <table class="table">
            <thead class="table">
            <tr class="table">
              <th class="infoAdherent">Numéro Licence</th>
              <th class="infoAdherent">Prénom</th>
              <th class="infoAdherent">Nom</th>
              <th class="infoAdherent">Sexe</th>
              <th class="infoAdherent">Ville</th>
              <th class="infoAdherent">Pays</th>
              <th class="infoAdherent">Téléphone</th>
              <th class="infoAdherent">Mobile</th>
              <th class="infoAdherent">Email</th>
              <th class="infoAdherent">Statut</th>
              <th class="infoAdherent">Actions</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="adherent in adherents" :key="adherent.numeroLicence">
              <tr class="info-adherent-container">
                <td class="infoAdherent">{{ adherent.numeroLicence }}</td>
                <td class="infoAdherent">{{ adherent.prenom }}</td>
                <td class="infoAdherent">{{ adherent.nom }}</td>
                <td class="infoAdherent">{{ adherent.sexe }}</td>
                <td class="infoAdherent">{{ adherent.ville }}</td>
                <td class="infoAdherent">{{ adherent.pays }}</td>
                <td class="infoAdherent">{{ adherent.telephone }}</td>
                <td class="infoAdherent">{{ adherent.mobile }}</td>
                <td class="infoAdherent">{{ adherent.email }}</td>
                <td class="infoAdherent">
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
                      <p><strong>Année Blanche:</strong> {{ adherent.anneeBlanche }}</p>
                      <p><strong>Date de Naissance :</strong> {{ adherent.dateNaissance }}</p>
                      <p><strong>Profession :</strong> {{ adherent.profession }}</p>
                      <p><strong>Saison :</strong> {{ adherent.saison.join(", ") }}</p>
                      <p><strong>Demi-Tarif :</strong> {{ adherent.demiTarif }}</p>
                      <p><strong>Hors Club :</strong> {{ adherent.horsClub }}</p>
                      <p><strong>Catégorie :</strong> {{ adherent.categorie }}</p>
                    </div>
                    <div class="details-colonne">
                      <p><strong>Pratique :</strong> {{ adherent.pratique }}</p>
                      <p><strong>Nom d'usage :</strong> {{ adherent.nomUsage }}</p>
                      <p><strong>Adresse Principale :</strong> {{ adherent.adressePrincipale }}</p>
                      <p><strong>Lieu-dit :</strong> {{ adherent.lieuDit }}</p>
                      <p><strong>Code postal :</strong> {{ adherent.codePostal }}</p>
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
</template>

<script>

import LogoTTM from "@/components/LogoTTM.vue";
import axios from "axios";

export default {
  components: {LogoTTM},
  data() {
    return {
      adherents: [
        { numeroLicence: "123456", prenom: "Jean", nom: "Dupont", statut: true, type: "Standard", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Triathlon", nomUsage: "Dupont", dateNaissance: "1985-03-22", sexe: "Homme", profession: "Ingénieur", adressePrincipale: "1 rue de Paris", details: "Appartement 12", lieuDit: "Quartier du Parc", codePostal: "75001", ville: "Paris", pays: "France", telephone: "01 23 45 67 89", mobile: "06 12 34 56 78", email: "jean.dupont@example.com", urgenceTelephone: "06 98 76 54 32", saison: ["2023/2024", "2024/2025"] },
        { numeroLicence: "789012", prenom: "Sophie", nom: "Martin", statut: false, type: "Pro", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Natation", nomUsage: "Martin", dateNaissance: "2002-07-14", sexe: "Femme", profession: "Étudiante", adressePrincipale: "22 rue des Lilas", details: "Bâtiment A", lieuDit: "Quartier Saint-Pierre", codePostal: "69001", ville: "Lyon", pays: "France", telephone: "04 56 78 90 12", mobile: "06 23 45 67 89", email: "sophie.martin@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"] },
        { numeroLicence: "345678", prenom: "Paul", nom: "Lemoine", statut: true, type: "Standard", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Cyclisme", nomUsage: "Lemoine", dateNaissance: "1978-11-05", sexe: "Homme", profession: "Médecin", adressePrincipale: "45 avenue de la République", details: "Appartement 3", lieuDit: "Centre-ville", codePostal: "13001", ville: "Marseille", pays: "France", telephone: "01 44 55 66 77", mobile: "06 76 54 32 10", email: "paul.lemoine@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"] },
        { numeroLicence: "456789", prenom: "Lucas", nom: "Bernard", statut: true, type: "Elite", demiTarif: false, horsClub: false, categorie: "Junior", anneeBlanche: false, pratique: "Athlétisme", nomUsage: "Bernard", dateNaissance: "2005-09-18", sexe: "Homme", profession: "Lycéen", adressePrincipale: "3 rue des Sports", details: "", lieuDit: "Quartier Nord", codePostal: "31000", ville: "Toulouse", pays: "France", telephone: "05 67 89 45 12", mobile: "06 78 12 45 67", email: "lucas.bernard@example.com", urgenceTelephone: "06 89 45 23 78", saison: ["2023/2024"] },
        { numeroLicence: "567890", prenom: "Emma", nom: "Durand", statut: false, type: "Standard", demiTarif: true, horsClub: true, categorie: "Cadet", anneeBlanche: true, pratique: "Gymnastique", nomUsage: "Durand", dateNaissance: "2008-04-25", sexe: "Femme", profession: "Collégienne", adressePrincipale: "10 rue des Écoles", details: "Appartement 2B", lieuDit: "Quartier Sud", codePostal: "44000", ville: "Nantes", pays: "France", telephone: "02 34 56 78 90", mobile: "06 45 78 23 12", email: "emma.durand@example.com", urgenceTelephone: "06 78 45 12 90", saison: ["2023/2024"] },
        { numeroLicence: "678901", prenom: "Hugo", nom: "Morel", statut: true, type: "Pro", demiTarif: false, horsClub: false, categorie: "Senior", anneeBlanche: false, pratique: "Judo", nomUsage: "Morel", dateNaissance: "1990-06-12", sexe: "Homme", profession: "Coach sportif", adressePrincipale: "5 avenue du Sport", details: "", lieuDit: "Centre-ville", codePostal: "33000", ville: "Bordeaux", pays: "France", telephone: "05 56 78 90 34", mobile: "06 98 76 54 32", email: "hugo.morel@example.com", urgenceTelephone: "06 67 89 45 23", saison: ["2023/2024", "2024/2025"] },
        { numeroLicence: "789013", prenom: "Laura", nom: "Girard", statut: false, type: "Standard", demiTarif: true, horsClub: true, categorie: "Junior", anneeBlanche: true, pratique: "Danse", nomUsage: "Girard", dateNaissance: "2003-12-03", sexe: "Femme", profession: "Étudiante", adressePrincipale: "18 rue de la Culture", details: "", lieuDit: "Quartier Historique", codePostal: "54000", ville: "Nancy", pays: "France", telephone: "03 29 67 89 10", mobile: "06 23 45 67 89", email: "laura.girard@example.com", urgenceTelephone: "06 54 32 10 98", saison: ["2023/2024"] },
        { numeroLicence: "890123", prenom: "Thomas", nom: "Roux", statut: true, type: "Pro", demiTarif: false, horsClub: false, categorie: "Senior", anneeBlanche: false, pratique: "Tennis", nomUsage: "Roux", dateNaissance: "1988-02-20", sexe: "Homme", profession: "Entraîneur", adressePrincipale: "7 rue du Court", details: "", lieuDit: "Quartier Ouest", codePostal: "69008", ville: "Lyon", pays: "France", telephone: "04 78 12 34 56", mobile: "06 98 76 12 34", email: "thomas.roux@example.com", urgenceTelephone: "06 11 22 33 44", saison: ["2023/2024", "2024/2025"] },
        { numeroLicence: "901234", prenom: "Alice", nom: "Lefevre", statut: true, type: "Standard", demiTarif: false, horsClub: true, categorie: "Senior", anneeBlanche: false, pratique: "Escalade", nomUsage: "Lefevre", dateNaissance: "1995-08-30", sexe: "Femme", profession: "Architecte", adressePrincipale: "12 rue des Rochers", details: "", lieuDit: "Montagne", codePostal: "38000", ville: "Grenoble", pays: "France", telephone: "04 76 12 34 56", mobile: "06 23 45 67 89", email: "alice.lefevre@example.com", urgenceTelephone: "06 89 76 54 32", saison: ["2023/2024", "2024/2025"] },
        { numeroLicence: "912345", prenom: "Marc", nom: "Petit", statut: false, type: "Pro", demiTarif: true, horsClub: false, categorie: "Junior", anneeBlanche: true, pratique: "Rugby", nomUsage: "Petit", dateNaissance: "2001-05-15", sexe: "Homme", profession: "Étudiant", adressePrincipale: "25 avenue du Stade", details: "", lieuDit: "Quartier Sportif", codePostal: "31000", ville: "Toulouse", pays: "France", telephone: "05 61 23 45 67", mobile: "06 12 34 56 78", email: "marc.petit@example.com", urgenceTelephone: "06 78 12 45 90", saison: ["2023/2024"] },
        { numeroLicence: "923456", prenom: "Nina", nom: "Dubois", statut: true, type: "Elite", demiTarif: false, horsClub: true, categorie: "Cadet", anneeBlanche: false, pratique: "Patinage artistique", nomUsage: "Dubois", dateNaissance: "2006-11-22", sexe: "Femme", profession: "Lycéenne", adressePrincipale: "8 rue des Glaces", details: "Résidence Grand Nord", lieuDit: "Centre-ville", codePostal: "59000", ville: "Lille", pays: "France", telephone: "03 20 45 67 89", mobile: "06 89 23 45 12", email: "nina.dubois@example.com", urgenceTelephone: "06 45 67 89 23", saison: ["2023/2024"] },
        { numeroLicence: "934567", prenom: "David", nom: "Moreau", statut: true, type: "Standard", demiTarif: false, horsClub: false, categorie: "Senior", anneeBlanche: false, pratique: "Boxe", nomUsage: "Moreau", dateNaissance: "1983-09-10", sexe: "Homme", profession: "Policier", adressePrincipale: "30 boulevard du Combat", details: "", lieuDit: "Quartier Défense", codePostal: "75012", ville: "Paris", pays: "France", telephone: "01 56 78 90 12", mobile: "06 67 45 23 89", email: "david.moreau@example.com", urgenceTelephone: "06 12 34 56 78", saison: ["2023/2024", "2024/2025"] }
      ],
      adherentSelectionne: null
    };
  },
  methods: {
    afficherDetails(numeroLicence) {
      this.adherentSelectionne = this.adherentSelectionne === numeroLicence ? null : numeroLicence;
    }
  },
  async mounted() {
    const uri = "/users/getAllAdherent";
    try {

      const token = this.$store.getters['getToken'];
      console.log(token);
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      this.adherents = response.data.adherents;
      }
    catch
      (error)
      {
        console.error("Erreur lors de la requête :", error);
      }
    }
  };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');


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

.table-wrapper {

  max-height: 60vh;
  overflow-y: auto;
}

.titre {
  position: fixed;
  top: 70px; /* Ajuste cette valeur selon la hauteur de ton header */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
}


.table {
  width: 100%;
  top: 100px;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f3f4f6;
}

tr:hover {
  background-color: #e2e8f0;
  transition: background 0.3s ease;
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

td.infoAdherent {
  text-align: center;
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

</style>
