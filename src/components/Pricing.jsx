import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
  const plans = [
    {
      tag: "$0 for 1 month",
      brand: "Premium",
      title: "Individual",
      accentClass: "accent--pink",
      priceTop: "$0 for 1 month",
      priceBottom: "$12.99 / month after",
      bullets: [
        "1 Premium account",
        "15 hours/month of listening time from our audiobooks subscriber catalog",
        "Cancel anytime",
      ],
      buttonText: "Try 1 month for $0",
      buttonClass: "btn--pink",
      finePrint:
        "$0 for 1 month, then $12.99 per month after. Offer only available if you haven't tried Premium before. Terms apply.",
    },
    {
      tag: "$0 for 1 month",
      brand: "Premium",
      title: "Student",
      accentClass: "accent--purple",
      priceTop: "$0 for 1 month",
      priceBottom: "$6.99 / month after",
      bullets: [
        "1 verified Premium account",
        "Discount for eligible students",
        "Access to Hulu (With Ads)",
        "Cancel anytime",
      ],
      buttonText: "Try 1 month for $0",
      buttonClass: "btn--purple",
      finePrint:
        "$0 for 1 month, then $6.99 per month after. Offer available only to eligible students. Terms apply.",
    },
    {
      tag: "",
      brand: "Premium",
      title: "Duo",
      accentClass: "accent--gold",
      priceTop: "$18.99 / month",
      priceBottom: "",
      bullets: [
        "2 Premium accounts",
        "15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
        "Cancel anytime",
      ],
      buttonText: "Get Premium Duo",
      buttonClass: "btn--gold",
      finePrint: "For couples who reside at the same address. Terms apply.",
    },
  ];

  return (
    <section className="plans">
      <div className="plans__container">
        <div className="plans__grid">
          {plans.map((p) => (
            <article key={p.title} className="planCard">
              {p.tag && <div className="planCard__tag">{p.tag}</div>}

              <div className="planCard__brandRow">
                <span className="planCard__logo" aria-hidden="true">
                  ●
                </span>
                <span className="planCard__brand">{p.brand}</span>
              </div>

              <h3 className={`planCard__title ${p.accentClass}`}>{p.title}</h3>

              <div className="planCard__priceTop">{p.priceTop}</div>
              {p.priceBottom && (
                <div className="planCard__priceBottom">{p.priceBottom}</div>
              )}

              <div className="planCard__divider" />

              <ul className="planCard__bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <button
                className={`planCard__btn ${p.buttonClass}`}
                onClick={() => navigate("/signup")}
              >
                {p.buttonText}
              </button>

              <p className="planCard__finePrint">{p.finePrint}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
