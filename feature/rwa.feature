Właściwość: Wykonanie transakcji na nowym koncie użytkownika

    Scenariusz: Rejestracja nowego użytkownika
        Gdy Jestem na stronie startowej aplikacji
        Kiedy Wybiorę opcję założenia nowego konta
        Wtedy Powinienem zobaczyć formularz rejestracji nowego użytkownika
        Kiedy Wprowadzę moje imię
        Oraz Wprowadze moje nazwisko
        Oraz Wprowadze moją nazwę użytkownika
        Oraz Wprowadze moje hasło użytkownika
        Oraz Wprowadze powtórnie moje hasło
        Wtedy Powinienem móc założyć nowe konto
        Kiedy Założę nowe konto
        Wtedy Powinienem zobaczyć ekran startowy

    Scenariusz: Logowanie nowo założonego użytkownika do aplikacji
        Gdy Jestem na stronie startowej aplikacji
        Kiedy Wprowadzę moją nazwę użytkownika
        Oraz Wprowadze moje hasło
        Wtedy Powinienem móc zalogować się do aplikacji
        Kiedy Zaloguje się do aplikacji
        Wtedy Powinienem zobaczyć ekran powitalny

    Scenariusz: Wprowadzenie danych nowego użytkownika na ekranie startowym
        Kiedy Loguje się po raz pierwszy
        Wtedy Powinienem zobaczyć formularz startowy
        Kiedy Rozpocznę wypełnianie formularza
        Oraz Wprowadze nazwę mojego banku
        Oraz Wprowadze numer identyfikacyjny banku
        Oraz Wprowadze numer konta bankowego
        Wtedy Powinienem móc zakończyć wypełnianie formularza

    Scenariusz: Dodanie nowej transakcji
        Gdy Jestem zalogowany i wypełniłem formularz startowy
        Wtedy Powinienem móc dodać nową transakcję
        Kiedy Wybiorę drugą osobę do wykonania transakcji
        Oraz Wprowadze kwotę transakcji
        Oraz Wprowadze tytuł transakcji
        Wtedy Mogę wykonać daną transakcję
