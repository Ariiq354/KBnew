import ModalConfirm from "~/components/ModalConfirm.vue";
import { useOverlay } from "#ui/composables/useOverlay";

const overlay = useOverlay();
export function openConfirmModal(anyFunction: () => Promise<void>) {
  const modal = overlay.create(ModalConfirm, {
    props: {
      function: anyFunction,
    },
  });

  modal.open();
}
