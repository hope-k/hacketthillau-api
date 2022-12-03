const transactions = [
    {
        transactionType: 'transfer',
        payeeAccountNumber: '12345678901',
        payeeRoutingNumber: '123458193',
        status: 'pending',
        amount: 5000,
        user: '6244ab4c33285b3f5bfb5535',
        accountId: '6244ab0a409890c5ec2f1356'
    },
    {
        transactionType: 'deposit',
        payeeAccountNumber: '12345678901',
        payeeRoutingNumber: '123458193',
        status: 'sent',
        amount: 5000,
        user: '6244ab4c33285b3f5bfb5535',
        accountId: '6244ab0a409890c5ec2f1357'
    },
    {
        transactionType: 'transfer',
        payeeAccountNumber: '12345678901',
        payeeRoutingNumber: '123458193',
        status: 'failed',
        amount: 5000,
        user: '6244ab5133285b3f5bfb5538',
        accountId: '6244ab0a409890c5ec2f1358'
    }
]
module.exports = transactions

