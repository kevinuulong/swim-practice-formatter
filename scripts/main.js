loadSwim('/content/2021-08-17.json');

async function loadSwim(swim) {
    const content = await fetch(swim)
        .then(res => res.json())
        .then(res => {
            // Set the title
            document.getElementById("title").innerText = res.title;
            document.title = res.title;

            // Set the date
            let date = res.date;
            date = date.replace(/-/g, '/');
            document.getElementById("date").innerText = date;

            // Tags
            res.tags.forEach(tag => {
                let elem = document.createElement('p');
                elem.className = "tag";
                elem.textContent = tag;
                document.getElementById("meta").appendChild(elem);
            });

            // Set sections
            let total = 0;
            res.body.forEach(section => {
                let sectionTitle = Object.keys(section)[0];
                let title = document.createElement('h2');
                title.textContent = sectionTitle;
                document.getElementById("body").appendChild(title);

                let distance = document.createElement('p');
                distance.className = "distance";
                document.getElementById("body").appendChild(distance);

                let sectionTotal = 0;

                // Create exercises
                let i = 1;
                section[sectionTitle].forEach(data => {
                    let exercise = document.createElement('div');
                    exercise.className = "exercise";

                    let number = document.createElement('p');
                    number.className = "number";
                    number.innerText = `${i}.`;
                    exercise.appendChild(number);
                    i++;

                    let details = document.createElement('p');
                    details.className = "details";
                    details.innerText = `${data.repetitions} x ${data.distance} ${data.stroke}`;
                    exercise.appendChild(details);

                    sectionTotal += data.repetitions * data.distance;

                    let description = document.createElement('p');
                    description.className = "description";
                    description.innerText = data.cycle ? `@${data.cycle} ${data.description}` : data.description;
                    exercise.appendChild(description);

                    document.getElementById("body").appendChild(exercise);
                })

                let distances = document.querySelectorAll(".distance:not(#total)")
                distances[distances.length - 1].textContent = `${sectionTotal} ${res.measurement}`;
                total += sectionTotal;
            })

            // Compute total distance
            let totalDistance = document.createElement('p');
            totalDistance.className = "distance";
            totalDistance.id = "total";
            totalDistance.textContent = `${total} ${res.measurement}`;

            document.querySelector(".page").appendChild(totalDistance);
        })
}