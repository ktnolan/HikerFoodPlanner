document.addEventListener('DOMContentLoaded', () => {
    // Sample food data to be displayed in the table
    let foodData = [
        { name: 'Oats', calories: 389, fat: 7, protein: 16, carbs: 66 },
        { name: 'Trail Mix', calories: 607, fat: 41, protein: 20, carbs: 49 },
        { name: 'Beef Jerky', calories: 410, fat: 28, protein: 33, carbs: 1 },
        { name: 'Granola Bar', calories: 193, fat: 10, protein: 3, carbs: 24 },
        { name: 'Dried Fruit', calories: 325, fat: 1, protein: 2, carbs: 85 }
    ];

    // Function to display the food data in the food table
    const displayFoods = (foodData) => {
        const foodList = document.getElementById('food-list');
        foodList.innerHTML = ''; // Clear existing food list
        foodData.forEach((food, index) => {
            const foodRow = document.createElement('tr');
            foodRow.setAttribute('data-index', index); // Set data-index attribute for each row
            foodRow.classList.add('table-row'); // Add hover effect class
            foodRow.innerHTML = `
                <td>${food.name}</td>
                <td>${food.calories}</td>
                <td>${food.fat}</td>
                <td>${food.protein}</td>
                <td>${food.carbs}</td>
            `;
            foodList.appendChild(foodRow); // Append the row to the food list
        });
    };


     // Function to save meal planner data to localStorage
     const saveMealPlannerData = () => {
        const rows = Array.from(mealPlannerTable.rows).map(row => {
            return {
                name: row.cells[0].innerText,
                calories: row.cells[1].innerText,
                fat: row.cells[2].innerText,
                protein: row.cells[3].innerText,
                carbs: row.cells[4].innerText
            };
        });
        localStorage.setItem('mealPlannerData', JSON.stringify(rows));
    };

    // Function to load meal planner data from localStorage
    const loadMealPlannerData = () => {
        const data = JSON.parse(localStorage.getItem('mealPlannerData'));
        if (data) {
            data.forEach(food => {
                const foodRow = document.createElement('tr');
                foodRow.innerHTML = `
                    <td>${food.name}</td>
                    <td>${food.calories}</td>
                    <td>${food.fat}</td>
                    <td>${food.protein}</td>
                    <td>${food.carbs}</td>
                `;
                mealPlannerTable.appendChild(foodRow);
            });
            updateSummaryRow();
        }

        
    };

    const updateSummaryRow = () => {
        const rows = Array.from(mealPlannerTable.rows);
        let totalCalories = 0, totalFat = 0, totalProtein = 0, totalCarbs = 0;
        
        rows.forEach(row => {
            totalCalories += parseInt(row.cells[1].innerText, 10);
            totalFat += parseInt(row.cells[2].innerText, 10);
            totalProtein += parseInt(row.cells[3].innerText, 10);
            totalCarbs += parseInt(row.cells[4].innerText, 10);
        });

        const summaryRow = document.getElementById('summaryRow');
        summaryRow.innerHTML = `
            <td>Total</td>
            <td>${totalCalories}</td>
            <td>${totalFat}</td>
            <td>${totalProtein}</td>
            <td>${totalCarbs}</td>
        `;
    };

    displayFoods(foodData); // Call the function to display foods on page load

    const foodItemsTable = document.getElementById('foodItemsTable');
    const mealPlannerTable = document.getElementById('mealPlannerTable').getElementsByTagName('tbody')[0];

    loadMealPlannerData();
    
    // Ensure elements exist before adding event listeners
    if (foodItemsTable && mealPlannerTable) {
        foodItemsTable.addEventListener('click', (event) => {
            if (event.target.tagName === 'TD') {
                const row = event.target.parentElement.cloneNode(true);
                row.classList.add('table-row'); // Add hover effect class
                mealPlannerTable.appendChild(row);
                saveMealPlannerData();
                updateSummaryRow();
            }
        });

        mealPlannerTable.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            if (event.target.tagName === 'TD') {
                const row = event.target.parentElement;
                mealPlannerTable.removeChild(row);
                saveMealPlannerData();
                updateSummaryRow();
            }
        });
    }

    // Function to sort the food data based on the selected criteria and display the sorted data
    const sortFoods = (criteria) => {
        const sortedFoods = [...foodData].sort((a, b) => {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return 0;
        });
        displayFoods(sortedFoods); // Display the sorted food data
    };

    const sortButton = document.getElementById('sort-button');
    const sortCriteria = document.getElementById('sort');

    if (sortButton && sortCriteria) {
        // Event listener for the sort button click event
        sortButton.addEventListener('click', () => {
            const criteria = sortCriteria.value;
            sortFoods(criteria);
        });
    }
});
