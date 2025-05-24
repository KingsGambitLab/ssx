export const PAYMENT_MODAL_CONFIG = {
  config: {
    display: {
      hide: [
        { method: 'emi' },
        { method: 'cardless_emi' },
      ],
      preferences: {
        show_default_blocks: true,
      },
    },
  },
};
