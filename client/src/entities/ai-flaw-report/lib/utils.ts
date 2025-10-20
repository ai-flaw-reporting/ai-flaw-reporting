import { SAVE_STATUS_KEY_PREFIX } from "../model/constants";

export const saveFormSaveStatus = (dataToSave: unknown, stepId: string) => {
  localStorage.setItem(
    `${SAVE_STATUS_KEY_PREFIX}${stepId}`,
    JSON.stringify(dataToSave),
  );
};

export const getFormSaveStatus = (stepId: string) => {
  const saved = localStorage.getItem(`${SAVE_STATUS_KEY_PREFIX}${stepId}`);
  return saved ? JSON.parse(saved) : null;
};
