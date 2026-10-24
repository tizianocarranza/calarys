"use client";

import { MagneticButton, SpotlightCard, Toggle } from "@calarys/ui";
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

export function LightingApp() {
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

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Demo app · Built with Calarys</span>

          <h1 className={styles.title}>Noct</h1>

          <p className={styles.lead}>
            Lighting for the rooms you live in. Every surface on this page
            shares one light: move the pointer and watch them agree.
          </p>
        </div>

        <p className={styles.summary} aria-live="polite">
          <span className={styles.summaryValue}>{litRooms.size}</span>
          <span>
            of {rooms.length} rooms lit
            <br />
            {litLamps} lamps on
          </span>
        </p>
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
              onClick={() => setLitRooms(new Set(sceneRooms))}
            >
              {name}
            </MagneticButton>
          ))}

          <MagneticButton
            radius={70}
            backgroundColor="#e4e2dd"
            textColor="#181714"
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

            return (
              <SpotlightCard
                key={room.id}
                radius={180}
                padding={24}
                cornerRadius={20}
                shadow={isLit}
                spotlightColor={isLit ? "#ffe9a8" : "#ffffff"}
                backgroundColor={isLit ? "#f1ede4" : "#e2e0db"}
              >
                <div className={styles.room} data-lit-room={isLit}>
                  <div className={styles.roomHeader}>
                    <span className={styles.roomFloor}>{room.floor}</span>

                    <Toggle
                      size="sm"
                      checked={isLit}
                      onChange={(on) => setRoom(room.id, on)}
                      aria-label={`${room.name} lights`}
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

        <SpotlightCard padding={8} cornerRadius={24} shadow>
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
                />
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </section>
    </div>
  );
}
