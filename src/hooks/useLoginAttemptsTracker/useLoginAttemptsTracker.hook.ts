import { useCallback, useEffect, useState } from "react";
import { MailService } from "../../services/mailer/mailer.service";

interface Attempts {
  firstAttemptTimeStamp: number;
  attempts: number;
}

const useLoginAttemptsTracker = (userEmail: string): [() => void] => {
  const [state, setAttempts] = useState<Attempts | undefined>(undefined);

  const sendAlertEmail = useCallback(async () => {
    try {
      const response = await MailService.instance.sendMail<{
        message: string;
      }>(
        userEmail,
        "Alert: Failed Login Attempts",
        `There have been 3 failed login attempts associated with the admin email: ${userEmail}.`
      );
      alert(response.message);
    } catch (error) {
      alert("Failed to send alert email.");
    }
  }, [userEmail]);

  useEffect(() => {
    if (state?.attempts && state.attempts >= 3) sendAlertEmail();
  }, [sendAlertEmail, state?.attempts]);

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
  return [trackAttempt];
};

export default useLoginAttemptsTracker;
