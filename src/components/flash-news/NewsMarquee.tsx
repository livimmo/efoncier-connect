import { Bell, MapPin, Info } from "lucide-react";

const recentNews = [
  {
    type: "alert",
    text: "Date limite TNB : 30 Juin",
  },
  {
    type: "success",
    text: "Nouveaux Terrains Disponibles à Rabat",
  },
  {
    type: "info",
    text: "Mise à jour de la politique de sécurité",
  },
];

export const NewsMarquee = () => {
  return (
    <div className="w-full bg-accent/10 mt-8 py-3 px-4 overflow-hidden">
      <div className="animate-[progress_20s_linear_infinite] whitespace-nowrap">
        {recentNews.map((news, index) => (
          <span key={index} className="inline-flex items-center mr-8">
            {news.type === "alert" && <Bell className="w-4 h-4 text-destructive mr-2" />}
            {news.type === "success" && <MapPin className="w-4 h-4 text-secondary mr-2" />}
            {news.type === "info" && <Info className="w-4 h-4 text-primary mr-2" />}
            {news.text}
          </span>
        ))}
      </div>
    </div>
  );
};