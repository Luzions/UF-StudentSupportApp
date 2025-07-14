import React, { useState } from "react";
import emergencyIcon from "../assets/emergency.png";
import phoneIcon from "../assets/phone.png";
import emailIcon from "../assets/email.png";
import clockIcon from "../assets/clock.png";
import locationIcon from "../assets/location.png";
import lightbulbIcon from "../assets/lightbulb.png";
import shieldIcon from "../assets/shield.png";
import moneyIcon from "../assets/money.png";
import brainIcon from "../assets/brain.png";
import bookIcon from "../assets/book.png";
import scalesIcon from "../assets/scales.png";

export default function CrisisResourcesAlt() {
  const [expandedSection, setExpandedSection] = useState("all");

  const toggleSection = (section) => {
    if (expandedSection === "all") {
      setExpandedSection(section);
    } else if (expandedSection === section) {
      setExpandedSection("all");
    } else {
      setExpandedSection(section);
    }
  };

  const styles = {
    container: {
      width: "100vw",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      background: "linear-gradient(45deg, #003366, #1a1a2e, #000080)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#ffffff",
      position: "relative",
    },
    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      paddingBottom: "2rem",
      borderBottom: "2px solid rgba(255,255,255,0.1)",
    },
    mainTitle: {
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      fontWeight: "800",
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #00d4ff, #ff6b6b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
      opacity: 0.8,
      fontWeight: "300",
      letterSpacing: "0.5px",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "2rem",
      marginBottom: "2rem",
    },
    section: {
      backgroundColor: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(211,211,211,0.2)",
      borderRadius: "20px",
      padding: "1.5rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    },
    emergencySection: {
      backgroundColor: "rgba(255,68,68,0.1)",
      border: "2px solid #ff4444",
      boxShadow: "0 0 30px rgba(255,68,68,0.3)",
    },
    sectionHeader: {
      marginBottom: "1rem",
      padding: "0.5rem 0",
    },
    title: {
      fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
      fontWeight: "600",
      margin: 0,
      color: "#FF7F00",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    emergencyTitle: {
      color: "#ff4444",
      textShadow: "0 0 10px rgba(255,68,68,0.5)",
    },
    item: {
      backgroundColor: "rgba(211,211,211,0.05)",
      border: "1px solid rgba(211,211,211,0.15)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1rem",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    itemName: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#FF7F00",
    },
    phoneNumber: {
      color: "#4169E1",
      fontWeight: "700",
      fontSize: "1.1rem",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    description: {
      color: "#D3D3D3",
      fontSize: "0.95rem",
      lineHeight: "1.5",
      marginBottom: "0.5rem",
    },
    hours: {
      color: "#FF7F00",
      fontWeight: "500",
      fontSize: "0.9rem",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    address: {
      color: "#D3D3D3",
      fontSize: "0.9rem",
      fontStyle: "italic",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    services: {
      color: "#ffffff",
      fontSize: "0.9rem",
      marginBottom: "0.5rem",
      paddingLeft: "1rem",
      borderLeft: "3px solid #FF7F00",
    },
    note: {
      color: "#32CD32",
      fontSize: "0.85rem",
      fontStyle: "italic",
      backgroundColor: "rgba(50,205,50,0.1)",
      padding: "0.5rem",
      borderRadius: "6px",
      border: "1px solid rgba(50,205,50,0.3)",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    floatingEmergency: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "linear-gradient(135deg, #ff4444, #cc0000)",
      color: "#ffffff",
      padding: "1rem 2rem",
      borderRadius: "50px",
      boxShadow: "0 10px 30px rgba(255,68,68,0.4)",
      fontSize: "1rem",
      fontWeight: "700",
      zIndex: 1000,
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      animation: "pulse 2s infinite",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    pulseAnimation: `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `,
    icon: {
      width: "20px",
      height: "20px",
      objectFit: "contain",
    },
    sectionIcon: {
      width: "24px",
      height: "24px",
      objectFit: "contain",
    },
    emergencyIcon: {
      width: "20px",
      height: "20px",
      objectFit: "contain",
    },
  };

  const sections = [
    {
      id: "emergency",
      title: "IMMEDIATE CRISIS SUPPORT",
      icon: emergencyIcon,
      isEmergency: true,
      items: [
        {
          name: "UF Police Department",
          phone: "(352) 392-1111",
          description: "24/7 Emergency Response",
          hours: "24 hours/day, 7 days/week",
        },
        {
          name: "UF Counseling & Wellness Center Crisis Line",
          phone: "(352) 392-1575",
          description: "24/7 crisis support for UF students",
          hours: "24 hours/day, 7 days/week",
        },
        {
          name: "National Suicide & Crisis Lifeline",
          phone: "988",
          description: "Free, confidential crisis support",
          hours: "24 hours/day, 7 days/week",
        },
        {
          name: "Alachua County Crisis Center",
          phone: "(352) 264-6760",
          description: "Crisis stabilization for acute psychiatric symptoms",
          hours: "24 hours/day, 7 days/week",
        },
        {
          name: "Florida Mental Health Hotline",
          phone: "(866) 903-3787",
          description: "Statewide mental health crisis support",
          hours: "24 hours/day, 7 days/week",
        },
      ],
    },
    {
      id: "campus-safety",
      title: "Campus Safety & Security",
      icon: shieldIcon,
      items: [
        {
          name: "GatorSafe Mobile App",
          description:
            "Submit crime tips, emergency calls, GPS location sharing",
          services:
            "Mobile BlueLight, Personal Safety Toolbox, Emergency Alerts",
          note: "Free download from Apple App Store or Google Play",
        },
        {
          name: "Blue Light Emergency Phones",
          description:
            "Strategically located across campus with direct connection to police",
          services: "24/7 emergency communication, visible blue light at night",
        },
        {
          name: "UF Alert System",
          description: "Multi-modal emergency notification system",
          services: "Text, email, and app notifications for campus emergencies",
          note: "Keep contact info updated in ONE.UF",
        },
        {
          name: "Campus Safety Escorts",
          phone: "(352) 392-1111",
          description: "Personal safety escort services across campus",
          hours: "Available 24/7 upon request",
        },
      ],
    },
    {
      id: "financial-emergency",
      title: "Financial Emergency Resources",
      icon: moneyIcon,
      items: [
        {
          name: "Hitchcock Field & Fork Pantry",
          description:
            "Food assistance for students experiencing food insecurity",
          hours: "Monday-Thursday: 9:30am-12:30pm",
          services: "Fresh produce, pantry items, meal assistance",
        },
        {
          name: "UF Student Financial Aid Emergency Funds",
          description: "Emergency financial assistance for unexpected expenses",
          services: "Textbook vouchers, emergency grants, basic needs support",
        },
        {
          name: "Dean of Students Basic Needs Support",
          description:
            "Comprehensive support for housing, food, and financial needs",
          services:
            "Emergency housing, utility assistance, transportation support",
        },
        {
          name: "UF Student Emergency Fund",
          description: "Short-term financial assistance for urgent needs",
          note: "Application required, processed on case-by-case basis",
        },
      ],
    },
    {
      id: "counseling",
      title: "Mental Health & Counseling Services",
      icon: brainIcon,
      items: [
        {
          name: "UF Counseling & Wellness Center (CWC)",
          phone: "(352) 392-1575",
          description:
            "Individual counseling, group therapy, workshops, biofeedback, psychiatry",
          hours: "Crisis Walk-ins: Monday-Friday, 9am-4pm",
          address: "401 Peabody Hall & 3190 Radio Road",
        },
        {
          name: "UF Health Shands Psychiatric Hospital",
          phone: "(352) 265-5481",
          description: "Emergency psychiatric services",
          hours: "24 hours/day, 7 days/week",
        },
        {
          name: "Medical Student Mental Health Support",
          phone: "(352) 627-0032",
          description: "Mental health services for medical students",
          hours: "Monday-Friday, 8am-5pm",
        },
      ],
    },
    {
      id: "academic",
      title: "Academic & Disability Support",
      icon: bookIcon,
      items: [
        {
          name: "Disability Resource Center (DRC)",
          phone: "(352) 392-8565",
          email: "accessuf@dso.ufl.edu",
          description:
            "Accommodations for students with disabilities, testing services",
          address: "Online services and campus locations",
        },
        {
          name: "Dean of Students Office",
          description:
            "Student advocacy, CARE team, campus assistance resources",
          services: "Campus Assistance & Resources for Empowerment (CARE)",
        },
        {
          name: "Academic Advising Services",
          description:
            "Academic planning, course selection, degree requirements",
          services: "Major exploration, graduation planning, academic recovery",
        },
      ],
    },
    {
      id: "titleix",
      title: "Title IX, Safety & Legal Support",
      icon: scalesIcon,
      items: [
        {
          name: "UF Title IX Compliance Office",
          description:
            "Support for sexual misconduct, discrimination, or violence",
          services: "Investigations, resolutions, prevention programs",
        },
        {
          name: "UF Office of Victim Services",
          description:
            "Victim advocacy, emotional support, criminal justice process support",
          note: "No police report required to access services",
        },
        {
          name: "Student Legal Services",
          description: "Legal assistance for students",
          hours: "Check website for availability",
        },
      ],
    },
  ];

  return (
    <>
      <style>{styles.pulseAnimation}</style>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.mainTitle}>University of Florida</h1>
            <p style={styles.subtitle}>
              Crisis Resources & Student Support Services
            </p>
          </div>

          <div style={styles.gridContainer}>
            {sections.map((section) => (
              <div
                key={section.id}
                style={{
                  ...styles.section,
                  ...(section.isEmergency ? styles.emergencySection : {}),
                }}
              >
                <div style={styles.sectionHeader}>
                  <h2
                    style={{
                      ...styles.title,
                      ...(section.isEmergency ? styles.emergencyTitle : {}),
                    }}
                  >
                    <img
                      src={section.icon}
                      alt={section.title}
                      style={styles.sectionIcon}
                    />
                    {section.title}
                  </h2>
                </div>

                <div>
                  {section.items.map((item, index) => (
                    <div key={index} style={styles.item}>
                      <div style={styles.itemName}>{item.name}</div>

                      {item.phone && (
                        <div style={styles.phoneNumber}>
                          <img
                            src={phoneIcon}
                            alt="Phone"
                            style={styles.icon}
                          />
                          {item.phone}
                        </div>
                      )}

                      {item.email && (
                        <div style={styles.phoneNumber}>
                          <img
                            src={emailIcon}
                            alt="Email"
                            style={styles.icon}
                          />
                          {item.email}
                        </div>
                      )}

                      {item.description && (
                        <div style={styles.description}>{item.description}</div>
                      )}

                      {item.hours && (
                        <div style={styles.hours}>
                          <img
                            src={clockIcon}
                            alt="Hours"
                            style={styles.icon}
                          />
                          {item.hours}
                        </div>
                      )}

                      {item.address && (
                        <div style={styles.address}>
                          <img
                            src={locationIcon}
                            alt="Location"
                            style={styles.icon}
                          />
                          {item.address}
                        </div>
                      )}

                      {item.services && (
                        <div style={styles.services}>
                          Services: {item.services}
                        </div>
                      )}

                      {item.note && (
                        <div style={styles.note}>
                          <img
                            src={lightbulbIcon}
                            alt="Note"
                            style={styles.icon}
                          />
                          {item.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          style={styles.floatingEmergency}
          onClick={() => (window.location.href = "tel:911")}
        >
          <img
            src={emergencyIcon}
            alt="Emergency"
            style={styles.emergencyIcon}
          />
          Emergency: 911
        </button>
      </div>
    </>
  );
}
