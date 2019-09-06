// Listing 2-6. Bar Chart Data Loading (version 5)
d3.tsv("data.tsv")
    .then((data) => {
        return data.map((d) => {
            d.frequency = +d.frequency;

            return d;
        });
    })
    .then((data) => {
        // Rest of code here
    })
    .catch((error) => {
        throw error;
    });