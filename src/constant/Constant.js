export const CITY = ["Ahmedabad", "Rajkot", "Surat", "Surendra-Nagar", "Patan", "Baroda"];
export const HEADCELLS = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'Id',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'mail',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'mobile',
        numeric: false,
        disablePadding: false,
        label: 'Mobile',
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: false,
        label: 'Gender',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: true,
        label: 'City',
    }
];
export const INITAL_STATE = {
    name : "",
    address : "",
    mail : "",
    mobile : "",
    gender : "",
    city : ""
}
export const  ERROR_STATE = {
    nameError : false,
    addressError : false,
    mailError : false,
    mobileError : false,
    genderError : false,
    cityError : false
}
