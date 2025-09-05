import { MapPin } from "lucide-react";
import { School } from "../../../generated/prisma";

export default function SchoolCard({ school }: { school: School }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={school.image}
          alt={school.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {school.name}
        </h3>

        <div className="flex items-start space-x-2 text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p>{school.address}</p>
            <p className="font-medium">{school.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
