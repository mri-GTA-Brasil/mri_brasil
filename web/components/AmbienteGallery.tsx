"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { PackGroup, Model3D } from "@/lib/models3d";
import { prettyName } from "@/lib/models3d";

// O viewer 3D só carrega no cliente, sob demanda.
const Model3DViewer = dynamic(() => import("./Model3DViewer"), { ssr: false });

export default function AmbienteGallery({
  groups,
  basePath,
}: {
  groups: PackGroup[];
  basePath: string;
}) {
  const first = groups[0]?.models[0] ?? null;
  const [active, setActive] = useState<Model3D | null>(first);

  return (
    <div className="mt-8">
      {/* Palco 3D */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card/40">
        <div className="aspect-video w-full">
          {active ? (
            <Model3DViewer
              key={active.glb}
              url={`${basePath}/models3d/${active.glb}`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              Selecione um modelo
            </div>
          )}
        </div>
        {active && (
          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
            <div>
              <p className="font-semibold">{prettyName(active.name)}</p>
              <p className="text-xs text-muted">
                {active.images > 0 ? "🟢 com textura BR" : "⚪ sem textura"} ·{" "}
                {active.meshes} peças · arraste para girar
              </p>
            </div>
            <code className="hidden text-xs text-muted sm:block">
              {active.name}
            </code>
          </div>
        )}
      </div>

      {/* Lista por pacote */}
      {groups.map((g) => (
        <section key={g.pack_key} className="mt-8">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <span>{g.icon}</span>
            {g.label}
            <span className="text-sm font-normal text-muted">
              ({g.models.length})
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {g.models.map((m) => {
              const isActive = active?.glb === m.glb;
              return (
                <button
                  key={m.glb}
                  onClick={() => setActive(m)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "border-brand-green/50 bg-brand-green/10 text-foreground"
                      : "border-border bg-card/60 text-muted hover:border-brand-green/30 hover:text-foreground"
                  }`}
                >
                  <span className="text-xs">{isActive ? "▶" : "◰"}</span>
                  <span className="flex-1 truncate">{prettyName(m.name)}</span>
                  {m.images > 0 && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                      title="com textura BR"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
