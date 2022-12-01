import * as  filtersApi from "../services/filtersApi";

async function filtering(filter, setErrorMessage, setError, setFilterModal) { 
    if(!filter.main) { 
        console.log('entrou');
        setErrorMessage('Choose a option at field type');
        setError(true);
        return;
    } else if(!filter.metod) {
        setErrorMessage('Choose a option at field metod');
        setError(true);
        return;
    } else if((filter.main === 'food-type' && typeof filter.metod === 'string') || (filter.main !== 'food-type' && typeof filter.metod === 'number')) { 
        setErrorMessage('Choose the options again');
        setError(true);
        return;
    }

    try {
        await filtersApi.filter(filter.main,filter.metod);
        const filterInfo = JSON.stringify({
            "main": filter.main,
            "metod": filter.metod
        });
        localStorage.setItem("FILTER",filterInfo);
        setFilterModal(false);
        window.location.reload();
    } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data);
        setError(true);
    }
}

function cleanFilters() { 
    localStorage.setItem("FILTER",null);
    window.location.reload();
}

export const filterFunctions = { 
    filtering,
    cleanFilters
}