"use client";

import {
  LightSource,
  MagneticButton,
  SpotlightCard,
  Toggle,
} from "@calarys/ui";
import { useState } from "react";

import styles from "./lighting-app.module.css";

type Room = {
  id: string;
  name: string;
  floor: string;
  lamps: number;
};

const rooms: Room[] = [
  { id: "living", name: "Living room", floor: "Ground floor", lamps: 6 },
  { id: "kitchen", name: "Kitchen", floor: "Ground floor", lamps: 4 },
  { id: "study", name: "Study", floor: "First floor", lamps: 2 },
  { id: "bedroom", name: "Bedroom", floor: "First floor", lamps: 3 },
  { id: "bath", name: "Bathroom", floor: "First floor", lamps: 2 },
  { id: "terrace", name: "Terrace", floor: "Outside", lamps: 5 },
];

type RoomId = Room["id"];

const scenes: Record<string, RoomId[]> = {
  Evening: ["living", "kitchen", "terrace"],
  Focus: ["study"],
};

const automations = [
  {
    id: "sunset",
    label: "Follow the sunset",
    description: "Warm the living room as daylight fades.",
    defaultChecked: true,
  },
  {
    id: "motion",
    label: "Motion sensors",
    description: "Light the hallway when someone walks by.",
    defaultChecked: true,
  },
  {
    id: "away",
    label: "Away mode",
    description: "Turn lights on and off at random while you travel.",
    defaultChecked: false,
  },
];

type Finish = "matte" | "light";

type Surface = {
  background: string;
  text: string;
  spotlight: string;
  intensity: number;
};

type Theme = {
  light: { color: string; intensity: number };
  scene: { background: string; text: string };
  sceneOff: { background: string; text: string };
  roomOn: Surface;
  roomOff: Surface;
  panel: Surface;
  border: string;
  toggle: { active: string; inactive: string; thumb: string };
};

// Matte black: hierarchy comes from near-identical tones and from the shared
// light, with one warm "LED" accent for whatever is on.
const themes: Record<Finish, Theme> = {
  matte: {
    light: { color: "#f4efe4", intensity: 0.35 },
    scene: { background: "#1c1c1f", text: "#e8e5de" },
    sceneOff: { background: "#121214", text: "#8f8c85" },
    roomOn: {
      background: "#18181b",
      text: "#e8e5de",
      spotlight: "#ffcf7a",
      intensity: 0.22,
    },
    roomOff: {
      background: "#111113",
      text: "#8f8c85",
      spotlight: "#ffffff",
      intensity: 0.06,
    },
    panel: {
      background: "#131315",
      text: "#e8e5de",
      spotlight: "#ffffff",
      intensity: 0.06,
    },
    border: "rgba(255, 255, 255, 0.06)",
    toggle: { active: "#e9e2d0", inactive: "#2a2a2e", thumb: "#7c7c82" },
  },
  light: {
    light: { color: "#ffffff", intensity: 0.6 },
    scene: { background: "#111111", text: "#ffffff" },
    sceneOff: { background: "#e4e2dd", text: "#181714" },
    roomOn: {
      background: "#f1ede4",
      text: "#181714",
      spotlight: "#ffe9a8",
      intensity: 0.65,
    },
    roomOff: {
      background: "#e2e0db",
      text: "#181714",
      spotlight: "#ffffff",
      intensity: 0.65,
    },
    panel: {
      background: "#e9e7e2",
      text: "#181714",
      spotlight: "#ffffff",
      intensity: 0.65,
    },
    border: "rgba(0, 0, 0, 0.12)",
    toggle: { active: "#181714", inactive: "#d8d6d1", thumb: "#ffffff" },
  },
};

export function LightingApp() {
  const [finish, setFinish] = useState<Finish>("matte");
  const theme = themes[finish];

  const [litRooms, setLitRooms] = useState<Set<RoomId>>(
    () => new Set(scenes.Evening),
  );

  function setRoom(id: RoomId, on: boolean) {
    setLitRooms((current) => {
      const next = new Set(current);

      if (on) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  }

  const litLamps = rooms
    .filter((room) => litRooms.has(room.id))
    .reduce((total, room) => total + room.lamps, 0);

  const toggleColors = {
    activeColor: theme.toggle.active,
    inactiveColor: theme.toggle.inactive,
    thumbColor: theme.toggle.thumb,
  };

  return (
    <LightSource
      color={theme.light.color}
      intensity={theme.light.intensity}
      finish={finish === "matte" ? "onyx" : "ivory"}
    >
      <div className={styles.app} data-finish={finish}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Demo app · Built with Calarys</span>

            <h1 className={styles.title}>Noct</h1>

            <p className={styles.lead}>
              Lighting for the rooms you live in. Every surface on this page
              shares one light: move the pointer and watch them agree.
            </p>
          </div>

          <div className={styles.headerAside}>
            <p className={styles.summary} aria-live="polite">
              <span className={styles.summaryValue}>{litRooms.size}</span>
              <span>
                of {rooms.length} rooms lit
                <br />
                {litLamps} lamps on
              </span>
            </p>

            <div className={styles.finish}>
              <span aria-hidden="true">Matte finish</span>

              <Toggle
                size="sm"
                checked={finish === "matte"}
                onChange={(on) => setFinish(on ? "matte" : "light")}
                aria-label="Matte finish"
                {...toggleColors}
              />
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="scenes-title">
          <h2 id="scenes-title" className={styles.sectionTitle}>
            Scenes
          </h2>

          <div className={styles.scenes}>
            {Object.entries(scenes).map(([name, sceneRooms]) => (
              <MagneticButton
                key={name}
                radius={70}
                backgroundColor={theme.scene.background}
                textColor={theme.scene.text}
                onClick={() => setLitRooms(new Set(sceneRooms))}
              >
                {name}
              </MagneticButton>
            ))}

            <MagneticButton
              radius={70}
              backgroundColor={theme.sceneOff.background}
              textColor={theme.sceneOff.text}
              onClick={() => setLitRooms(new Set())}
            >
              All off
            </MagneticButton>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="rooms-title">
          <h2 id="rooms-title" className={styles.sectionTitle}>
            Rooms
          </h2>

          <div className={styles.rooms}>
            {rooms.map((room) => {
              const isLit = litRooms.has(room.id);
              const surface = isLit ? theme.roomOn : theme.roomOff;

              return (
                <SpotlightCard
                  key={room.id}
                  radius={180}
                  padding={24}
                  cornerRadius={20}
                  shadow={isLit}
                  intensity={surface.intensity}
                  spotlightColor={surface.spotlight}
                  backgroundColor={surface.background}
                  textColor={surface.text}
                  borderColor={theme.border}
                >
                  <div className={styles.room} data-lit-room={isLit}>
                    <span className={styles.led} aria-hidden="true" />

                    <div className={styles.roomHeader}>
                      <span className={styles.roomFloor}>{room.floor}</span>

                      <Toggle
                        size="sm"
                        checked={isLit}
                        onChange={(on) => setRoom(room.id, on)}
                        aria-label={`${room.name} lights`}
                        {...toggleColors}
                      />
                    </div>

                    <h3 className={styles.roomName}>{room.name}</h3>

                    <span className={styles.roomStatus}>
                      {isLit ? `${room.lamps} lamps on` : "Off"}
                    </span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="automations-title">
          <h2 id="automations-title" className={styles.sectionTitle}>
            Automations
          </h2>

          <SpotlightCard
            padding={8}
            cornerRadius={24}
            shadow
            intensity={theme.panel.intensity}
            spotlightColor={theme.panel.spotlight}
            backgroundColor={theme.panel.background}
            textColor={theme.panel.text}
            borderColor={theme.border}
          >
            <ul className={styles.automations}>
              {automations.map((automation) => (
                <li key={automation.id} className={styles.automation}>
                  <div>
                    <span className={styles.automationLabel}>
                      {automation.label}
                    </span>

                    <span className={styles.automationDescription}>
                      {automation.description}
                    </span>
                  </div>

                  <Toggle
                    defaultChecked={automation.defaultChecked}
                    aria-label={automation.label}
                    {...toggleColors}
                  />
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </section>
      </div>
    </LightSource>
  );
}
