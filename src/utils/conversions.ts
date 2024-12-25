export const convertFiscalStatus = (status: "compliant" | "non_compliant" | "under_review") => {
  switch (status) {
    case "compliant":
      return "Conforme";
    case "non_compliant":
      return "Non conforme";
    case "under_review":
      return "En cours de révision";
    default:
      return "Inconnu";
  }
};