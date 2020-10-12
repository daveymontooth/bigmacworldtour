import React from 'react';

/* Create a context */
const { Provider, Consumer } = React.createContext();

/* Create Global Provider class */
class GlobalProvider extends React.Component {
    /* Initial user state */
    state = {
        activeView: "intro",
        data: [],
        dollarAmount: 0,
        error: "",
        ip: "",
        loading: false,
        location: {
            city: "",
            continent: "",
            country: ""
        }
    };

    /* Fetch User IP and then country */
    async componentDidMount() {

        this.setState({ loading: true });

        /* Load IP and country */
        const ipRequest = await fetch("https://api.ipify.org/?format=json");
        const ipJson = await ipRequest.json();

        if (!ipJson.ip || ipJson.ip === "") {
            this.setState({ error: "Could not load IP data" });
            this.setState({ loading: false });
        } else {
            this.setState({ ip: ipJson.ip });

            const locationRequest = await fetch(`/api/ip/${ipJson.ip}`);
            const locationJson = await locationRequest.json();

            if (locationJson.data) {
                this.setState({
                    location: {
                        city: locationJson.data.city_name || "",
                        continent: locationJson.data.continent_name || "",
                        country: locationJson.data.country_name || ""
                    }
                });
            } else {
                this.setState({ error: "Could not load country based on IP" });
            }

            this.setState({ loading: false });
        }

        const bigMacRequest = await fetch("/api/data");
        const bigMacJson = await bigMacRequest.json();

        if (bigMacJson.data) {
            this.setState({ data: bigMacJson.data });
        } else {
            this.setState({ error: "Could not load Big Mac data" });
        }
    }

    handleDollarAmount = amount => {
        console.log(amount);
        this.setState({ dollarAmount: amount });
    };

    handleShowMacs = () => {
        /* Look up big mac data based on country */
        this.setState({ activeView: "parity" });
    }

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    onDollarAmount: this.handleDollarAmount,
                    onShowMacs: this.handleShowMacs 
                }}
            >
                { this.props.children }
            </Provider>
        );
    }
};

export { GlobalProvider, Consumer as GlobalConsumer };