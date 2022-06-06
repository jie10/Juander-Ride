var users = [
    {
        "_id": "2fc22f06-0bbb-49da-ad23-85a42aeb873c",
        "employee_id": "00654123",
        "name": "John Smith",
        "department": "Information Technology",
        "job_role": "Software Engineer",
        "avatar_image": "avatar.jpg",
        "is_carpool_driver": false,
        "carpool": {
            "location": "Makati City",
            "target_location": "",
            "drop_off_point": "",
            "onsite_schedule": "a",
            "contact_no": "0927 456 9988",
            "onsite_days": "tues,wed"
        },
        "account": {
            "email": "john.smith@cebupacificair.com",
            "password": "p@ssword12345",
            "access_role": "p"
        }
    },
    {
        "_id": "04cfc413-7dfe-468a-9cb4-e5b5120e5760",
        "employee_id": "00765234",
        "name": "Rachel Reyes",
        "department": "HR Department",
        "job_role": "HR Specialist",
        "avatar_image": "avatar_2.jpg",
        "is_carpool_driver": false,
        "carpool": {
            "location": "Bacoor, Cavite",
            "target_location": "",
            "drop_off_point": "",
            "onsite_schedule": "c",
            "contact_no": "0917 123 5432",
            "onsite_days": "mon,tues,wed,thurs,fri"
        },
        "account": {
            "email": "rachel.reyes@cebupacificair.com",
            "password": "p@ssword12345",
            "access_role": "p"
        }
    },
    {
        "_id": "f070eb4d-21d3-423d-8a90-9655084c922c",
        "employee_id": "00208245",
        "name": "Bob Santos",
        "department": "Admin",
        "job_role": "Driver",
        "avatar_image": "avatar_3.jpg",
        "is_carpool_driver": true,
        "carpool": {
            "location": "Pasay City",
            "target_location": "",
            "drop_off_point": "",
            "contact_no": "0969 637 1234",
            "onsite_schedule": "d",
            "onsite_days": "mon,tues,wed,thurs,fri"
        },
        "account": {
            "email": "bob.santos@cebupacificair.com",
            "password": "p@ssword12345",
            "access_role": "d"
        }
    }
];

var carpools = [
    {
        "_id": "5610c8a7eb88429ba249cc27b2f9893a",
        "ride_type": "car",
        "available_seats": 4,
        "passenger_capacity": 4,
        "vehicle_type": "sedan",
        "vehicle_brand": "Toyota",
        "vehicle_model": "VIOS 1.5 G CVT",
        "vehicle_color": "white",
        "plate_number": "LTO 1234",
        "target_location": "SM Bacoor Parking Area",
        "location": "Cavite",
        "pick_up_location": "14.444506521713812,120.94977917866827",
        "employee_id": "00208245",
        "passengers": []
    }
];