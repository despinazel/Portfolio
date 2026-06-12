/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface MobileSimulatorProps {
  currentLang: "GR" | "EN";
}

export function MobileSimulator({ currentLang }: MobileSimulatorProps) {
  // Figma embed URL representing the custom Hi-Fi prototype.
  const figmaEmbedUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FzPDOKKVDvj7mY7QnxBSbpe%2FHi-Fi---Fluffy-Care-App%3Fnode-id%3D71-2355%26p%3Df%26viewport%3D225%252C119%252C0.29%26t%3D9X1MFEg7QPqgPfBt-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D71%253A2355%26show-proto-sidebar%3D1%26page-id%3D4%253A5";
  const prototypeUrl = "https://www.figma.com/proto/zPDOKKVDvj7mY7QnxBSbpe/Hi-Fi---Fluffy-Care-App?node-id=71-2355&p=f&viewport=225%2C119%2C0.29&t=9X1MFEg7QPqgPfBt-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=71%3A2355&show-proto-sidebar=1&page-id=4%3A5";

  return (
    <div className="w-full max-w-[600px] mx-auto" id="mobile-device-simulator">
      {/* Desktop View: Iframe within the aspect-[9/16] device layout */}
      <div className="hidden md:block w-full aspect-[9/16] bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl border border-outline-variant relative">
        <iframe 
          src={figmaEmbedUrl}
          className="w-full h-full border-0 bg-[#1e1e1e]"
          allowFullScreen
          title="Fluffy Care Figma Live Prototype"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Responsive View for Mobile/Tablet: Sleek button matching the app aesthetics */}
      <div className="block md:hidden w-full p-6 bg-surface border border-outline-variant rounded-2xl shadow-sm text-center">
        <p className="text-sm text-on-surface-variant mb-4 font-sans leading-relaxed">
          {currentLang === "GR" 
            ? "Για καλύτερη εμπειρία σε κινητές συσκευές, εξερευνήστε το διαδραστικό πρωτότυπο απευθείας στο Figma." 
            : "For the best experience on mobile devices, view the interactive prototype directly in Figma."}
        </p>
        <a 
          href={prototypeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-pet-teal hover:opacity-90 text-[#ffffff] font-bold py-3.5 px-6 rounded-xl w-full text-base shadow-sm transition-all cursor-pointer"
        >
          <span>
            {currentLang === "GR" ? "Άνοιγμα Πρωτοτύπου" : "Open Prototype"}
          </span>
          <span className="material-symbols-outlined text-xl">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
