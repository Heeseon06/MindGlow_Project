document.getElementById('form').addEventListener('submit', function (event) {
    const q = document.getElementsByClassName('option').length
    const radioGroups = [];

    for (let i = 1; i <= q; i++) {
        radioGroups.push(`${i}`);
    }
    let allSelected = true;

    for (let group of radioGroups) {
        const radios = document.getElementsByName(group);
        let groupSelected = false;

        // Check if any radio in the group is selected
        for (let radio of radios) {
            if (radio.checked) {
                groupSelected = true;
                break;
            }
        }

        if (!groupSelected) {
            allSelected = false;
            alert(`${group}번 문항을 선택해 주세요.`);
            break;
        }
    }

    // If not all groups are selected, prevent form submission
    if (!allSelected) {
        event.preventDefault();
    }
});