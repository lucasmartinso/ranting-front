function cleanFilters() { 
    localStorage.setItem("FILTER",null);
    window.location.reload();
}

export const filterFunctions = { 
    cleanFilters
}