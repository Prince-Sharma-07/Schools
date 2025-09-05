"use client";
import { Button } from "@/components/ui/button";
import SchoolCard from "@/components/cards/SchoolCard";
import axios from "axios";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { School } from "../../../generated/prisma";

export default function SchoolsListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSchools() {
      try {
        const res = await axios.get("/api/showSchools");
        setSchools(res.data.data);
        console.log(res.data.message);
        setLoading(false);
      } catch (err: any) {
        console.log("Error while fetching schools ", err.message);
        toast("Error while loading schools!");
      }
    }
    getSchools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  const cities = [...new Set(schools?.map((school) => school.city))];
  const filteredSchools = schools?.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "" || school.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900">
            Find the Perfect School
          </h1>

          <div className="flex mt-4 flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search schools by name or location..."
                className="w-full border-none outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                className="border-none outline-none"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredSchools?.length}</span>{" "}
            schools
            {selectedCity && ` in ${selectedCity}`}
          </p>
          <Link href={"/addSchool"}>
            <Button>
              <Plus />
              School
            </Button>
          </Link>
        </div>

        {filteredSchools?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No schools found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
