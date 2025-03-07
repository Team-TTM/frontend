  <template>

    <LogoTTM/>

    <div class="main-container">
      <h1 class="titre">Liste des Adhérents</h1>
      <div class="panel-adherents">

        <div class="filters-container">
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
                <th>Numéro Licence</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Ville</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Saison</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="adherent in adherentsFiltres" :key="adherent.numeroLicence">
              <tr class="info-adherent-container">
                  <td>{{ adherent.numeroLicence }}</td>
                  <td>{{ adherent.prenom.toUpperCase() }}</td>
                  <td>{{ adherent.nom }}</td>
                  <td>{{ adherent.ville }}</td>
                  <td>{{ afficherTelephoneMobile(adherent.mobile)    }}</td>
                  <td>{{ adherent.email }}</td>
                  <td> {{ adherent.saison}}</td>
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
                        <p><strong>Date de Naissance :</strong> {{ adherent.dateNaissance }}</p>
                        <p><strong>Sexe :</strong> {{ convertirSexe(adherent.sexe) }}</p>
                        <p><strong>Profession :</strong> {{ adherent.profession }}</p>
                        <p><strong>Saison :</strong> {{ adherent.saison.join(", ") }}</p>
                        <p><strong>Demi-Tarif :</strong> {{ convertirBoolenEnOuiNon(adherent.demiTarif) }}</p>

                      </div>
                      <div class="details-colonne">
                        <p><strong>Catégorie :</strong> {{ adherent.categorie }}</p>
                        <p><strong>Nom d'usage :</strong> {{ adherent.nomUsage }}</p>
                        <p><strong>Adresse Principale :</strong> {{ adherent.principale }}</p>
                        <p><strong>Lieu dit :</strong> {{ convertLieuDit(adherent.lieuDit) }}</p>
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
  </template>

  <script>

  import LogoTTM from "@/components/LogoTTM.vue";
  import axios from "axios";
  export default {
    components: {LogoTTM},
    data() {
      return {
        adherents: [
          /*{
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
      };
    },
    methods: {
      afficherDetails(numeroLicence) {
        this.adherentSelectionne = this.adherentSelectionne === numeroLicence ? null : numeroLicence;
      },
      afficherTelephoneMobile(mobile) {
        if (mobile.length <= 1) {
          return "";
        } else {
          return "0" + mobile;
        }
      },
      convertirDateInverse(dateObj) {
        const formatDate = new Intl.DateTimeFormat('fr-FR');
        return formatDate.format(dateObj);
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

      convertLieuDit(value){
        return String(value);
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

        // Mettre à jour adherentsFiltres
        this.adherentsFiltres = filteredAdherents;
      }

    },
    computed: {


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
  };
  </script>

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

  .titre {
    position: fixed;
    top: 70px;
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
    background-color: #f8f9fa;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
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

  </style>
