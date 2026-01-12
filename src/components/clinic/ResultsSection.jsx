import React from 'react';

const results = [
  { id: 1, treatment: 'Laser Hair Removal', area: 'Full Legs' },
  { id: 2, treatment: 'Carbon Peel', area: 'Face' },
  { id: 3, treatment: 'Tattoo Removal', area: 'Arm' },
  { id: 4, treatment: 'HIFU', area: 'Face & Neck' },
];

export default function ResultsSection({ lang }) {
  return (
    <section className="bg-[#E9DDCF] py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#241814] mb-4">
            {lang === 'es' ? 'Resultados Reales' : 'Real Results'}
          </h2>
          <p className="text-[#6E5B50] max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'Transformaciones auténticas de nuestros pacientes.'
              : 'Authentic transformations from our patients.'}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {results.map((result) => (
            <div 
              key={result.id}
              className="bg-[#FFFCF8] rounded-lg overflow-hidden border border-[rgba(36,24,20,0.08)] shadow-sm"
            >
              {/* Before/After Images */}
              <div className="flex">
                <div className="flex-1 aspect-square bg-[#E9DDCF] flex items-center justify-center border-r border-[rgba(36,24,20,0.08)]">
                  <span className="text-xs text-[#6E5B50] uppercase tracking-wider">
                    {lang === 'es' ? 'Antes' : 'Before'}
                  </span>
                </div>
                <div className="flex-1 aspect-square bg-[#DBCAB6] flex items-center justify-center">
                  <span className="text-xs text-[#6E5B50] uppercase tracking-wider">
                    {lang === 'es' ? 'Después' : 'After'}
                  </span>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-medium text-[#241814]">{result.treatment}</p>
                <p className="text-xs text-[#6E5B50] mt-1">{result.area}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[#6E5B50]/70 mt-8 italic">
          {lang === 'es' 
            ? 'Los resultados pueden variar según cada paciente. Todas las fotos son de pacientes reales con su consentimiento.'
            : 'Results may vary depending on each patient. All photos are from real patients with their consent.'}
        </p>
      </div>
    </section>
  );
}