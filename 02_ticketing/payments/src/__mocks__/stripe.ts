export const stripe = {
    charges: {
        create: jest.fn().mockResolvedValue({id: 'stripe_id_test_Id-xxxxxxxx'}),
    },
};
