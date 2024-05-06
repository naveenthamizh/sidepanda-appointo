import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

import SlotPicker from "./Components/SlotsPicker";
import DetailsForm from "./Components/DetailsForm";
import SlotConfirmation from "./Components/SlotConfirmation";

import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
} from "../../Common/Components/Button";
import { RenderWhen } from "../../Common/Utils/RenderWhen";

import { BOOKING_STEPS } from "./types";

import styles from "./meetingscheduler.module.css";

function MeetingScheduler() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const currentStepName = Object.values(BOOKING_STEPS)[currentStep];

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <RenderWhen.If isTrue={currentStepName === BOOKING_STEPS.SLOT_PICKER}>
          <SlotPicker />
        </RenderWhen.If>
        <RenderWhen.If isTrue={currentStepName === BOOKING_STEPS.DETAILS_FORM}>
          <DetailsForm />
        </RenderWhen.If>
        <RenderWhen.If
          isTrue={currentStepName === BOOKING_STEPS.CONFIRMATION_PAGE}
        >
          <SlotConfirmation />
        </RenderWhen.If>
        <footer className={styles.footer}>
          <div>
            Powered By&nbsp;
            <span
              className={styles.footerLink}
              onClick={() =>
                window.open(
                  "https://apps.shopify.com/appointo-appointments-and-bookings",
                  "_blank"
                )
              }
            >
              Appointo
            </span>
          </div>
          <div className={styles.actionBtn}>
            {currentStepName === BOOKING_STEPS.DETAILS_FORM && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                size={BUTTON_SIZES.LARGE}
                variant={BUTTON_VARIANTS.SECONDARY}
                leftIcon={
                  <SlArrowLeft color="var(--colors-success-700)" size="10" />
                }
              >
                Back
              </Button>
            )}
            {currentStepName !== BOOKING_STEPS.CONFIRMATION_PAGE && (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                size={BUTTON_SIZES.LARGE}
                variant={BUTTON_VARIANTS.SECONDARY}
                rightIcon={
                  <SlArrowRight color="var(--colors-success-700)" size="10" />
                }
              >
                {currentStepName === BOOKING_STEPS.DETAILS_FORM
                  ? "Schedule Event"
                  : "Next"}
              </Button>
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}

export default MeetingScheduler;
