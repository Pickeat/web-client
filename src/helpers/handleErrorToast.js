import { toast } from 'react-toastify';
import logout from './logout';

const errorTranslation = {
  ServerError: 'Une erreur du serveur est survenue.',
  InvalidCredentials: "Votre nom d'utilisateur ou mot de passe est invalide.",
  Unauthorized: "Vous n'êtes pas autorisé à effectuer cette action.",
  RouteNotFound: "La route demandée n'est pas disponible ou n'existe pas.",
  EmailAlreadyTaken: 'Cette adresse email est déjà utilisée.',
  MissingRequiredFields: 'Un ou plusieurs champs obligatoires sont vides.',
  InvalidBodyFields: 'Un ou plusieurs champs sont invalides.',
  TokenExpired: "Le token d'authentification est arrivé à expiration.",
  InvalidEmail: "L'adresse email renseignée n'est pas valide.",
  InvalidPassword: "Le mot de passe renseigné n'est pas valide.",
  InvalidOldPassword: "L'ancien mot de passe renseigné n'est pas valide.",
  InvalidNewPassword: "Le nouveau mot de passe renseigné n'est pas valide.",
  InvalidPhoneNumber: "Le numéro de téléphone renseigné n'est pas valide.",
  PhoneNumberAlreadyUsed: 'Ce numéro de téléphone est déjà utilisé.',
  UserNotFound: 'Utilisateur introuvable.',
  AnnounceNotFound: 'Annonce introuvable.',
  MissingRequiredFile: 'Un fichier requis est manquant.',
  AnnounceNotAvailable: "Cette annonce n'est pas disponible.",
  AnnounceNotReserved: "Cette annonce n'est pas réservée.",
  ForeignAnnounce: "Vous n'êtes pas autorisé à interagir avec cette annonce.",
  AnnounceNotNotable: 'Vous ne pouvez pas donner de note à cette annonce.',
  InvalidQueryFields: "Un ou plusieurs paramètres dans l'url sont invalides.",
  AnnounceNotEditable: "Cette annonce n'est pas modifiable.",
  AlreadyReport: 'Vous avez déjà signalé cet utilisateur.',
  EmailNeeded: 'Une adresse email est requise.',
  UserAlreadyConfirmed: 'Vous avez déjà confirmé votre compte.',
  AccountNotConfirmed: "Votre compte n'est pas confirmé.",
  InvalidAnnounceId: "L'id de l'annonce n'est pas valide.",
  InvalidBarcode: "Le code barre renseigné n'est pas valide.",
  InvalidExpirationDate: "La date d'expiration renseignée n'est pas valide.",
};

export default function handleErrorToast(error) {
  if (error?.response?.data?.error === 'TokenExpired') {
    toast.error(
      "Votre authentification a expirée ou n'est pas valide, essayez de vous reconnecter",
    );
    setTimeout(() => {
      logout();
    }, 2000);
    return;
  }
  if (error.response) {
    if (error.response.data.error) {
      if (errorTranslation[error.response.data.error]) {
        toast.error(errorTranslation[error.response.data.error]);
      } else {
        toast.error(error.response.data.error);
      }
    } else if (error.response.data.description) {
      toast.error(error.response.data.description);
    } else {
      toast.error('Erreur serveur inconnue.');
    }
  } else if (error.message) {
    toast.error(error.message);
  }
}
