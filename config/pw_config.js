const CONFIG = {
    style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#253C64",
        themeColor: "#ffffff",
        headerBackgroundColor: "#ffffff",
        headerColor: "#253C64",
        errorColor: "",
        successColor: "",
        card: {
            padding: "",
            backgroundColor: ""
        }
    },
    jsFile: "",
    data: {
        orderId: "ORDERID_98765",
        amount: "10",
        token: "e334366c509b4294a285a3b42a5659ea1584106015734",
        tokenType: "TXN_TOKEN",
        userDetail: {
            mobileNumber: "",
            name: ""
        }
    },
    merchant: {
        mid: process.env.PWID,
        name: "Yellow Collar",
        logo: process.env.API+"/favicon.png",
        redirect: true
    },
    mapClientMessage: {},
    labels: {},
    payMode: {
        labels: {},
        filter: {
            exclude: []
        },
        order: [
            "NB",
            "CARD",
            "LOGIN"
        ]
    },
    flow: "DEFAULT"
};

export default CONFIG;