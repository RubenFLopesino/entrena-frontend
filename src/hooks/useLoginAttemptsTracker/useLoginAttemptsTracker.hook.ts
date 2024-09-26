import { Dispatch, SetStateAction, useState } from "react";
import { MailService } from "../../services/mailer/mailer.service";

interface Attempts {
  firstAttemptTimeStamp: number;
  attempts: number;
}

const useLoginAttemptsTracker = (userEmail: string): [() => void] => {
  const state = useState<Attempts | undefined>(undefined);
  const setAttempts = state.pop() as Dispatch<
    SetStateAction<Attempts | undefined>
  >;

  const trackAttempt = (): void => {
    const oneMinute = 60 * 1000;
    const now = Date.now();

    setAttempts((currentAttempts) => {
      if (currentAttempts) {
        const timeDifference = now - currentAttempts.firstAttemptTimeStamp;

        if (timeDifference > oneMinute) {
          return {
            firstAttemptTimeStamp: now,
            attempts: 1,
          };
        }

        const newAttempts = currentAttempts.attempts++;

        if (newAttempts >= 3) sendAlertEmail();

        return {
          ...currentAttempts,
          attempts: newAttempts,
        };
      }

      return {
        firstAttemptTimeStamp: now,
        attempts: 1,
      };
    });
  };

  const sendAlertEmail = async () => {
    try {
      const response = await MailService.instance.sendMail<{
        message: string;
      }>(
        userEmail,
        "Alert: Failed Login Attempts",
        `There have been 3 failed login attempts associated with the admin email: ${userEmail}.`,
      );
      alert(response.message);
    } catch (error) {
      alert("Failed to send alert email.");
    }
  };

  return [trackAttempt];
};

export default useLoginAttemptsTracker;
