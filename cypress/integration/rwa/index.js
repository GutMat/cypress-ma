describe("Wykonanie transakcji na nowym koncie użytkownika", () => {
  beforeEach(() => {
    // Preserve cookie in every test
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      },
    });
  });
  it("Rejestracja nowego użytkownika", () => {
    // Gdy Jestem na stronie startowej aplikacji
    cy.visit("http://localhost:3000/");
    // Kiedy Wybiorę opcję założenia nowego konta
    cy.getBySel("signup").click();
    // Wtedy Powinienem zobaczyć formularz rejestracji nowego użytkownika
    cy.getBySel("signup-title").should("contain.text", "Sign Up");
    // Kiedy Wprowadzę moje imię
    cy.get("#firstName").type("Mateusz");
    // Oraz Wprowadze moje nazwisko
    cy.get("#lastName").type("Gut");
    // Oraz Wprowadze moją nazwę użytkownika
    cy.get("#username").type("GutMat");
    // Oraz Wprowadze moje hasło użytkownika
    cy.get("#password").type("Test123$%");
    // Oraz Wprowadze powtórnie moje hasło
    cy.get("#confirmPassword").type("Test123$%");
    // Wtedy Powinienem móc założyć nowe konto
    cy.getBySel("signup-submit")
      .as("signupButton")
      .should("not.have.attr", "disabled");
    // Kiedy Założę nowe konto
    cy.get("@signupButton").click();
    // Wtedy Powinienem zobaczyć ekran startowy
    cy.contains("h1", "Sign in");
  });
  it("Logowanie nowo założonego użytkownika do aplikacji", () => {
    // Gdy Jestem na stronie startowej aplikacji
    cy.contains("h1", "Sign in");
    // Kiedy Wprowadzę moją nazwę użytkownika
    cy.get("#username").type("GutMat");
    // Oraz Wprowadze moje hasło
    cy.get("#password").type("Test123$%");
    // Wtedy Powinienem móc zalogować się do aplikacji
    cy.getBySel("signin-submit")
      .as("signinButton")
      .should("not.have.attr", "disabled");
    // Kiedy Zaloguje się do aplikacji
    cy.intercept("GET", "/transactions/public").as("transaction");
    cy.get("@signinButton").click();
    // Wtedy Powinienem zobaczyć ekran powitalny
    cy.wait("@transaction");
  });
  it("Wprowadzenie danych nowego użytkownika na ekranie startowym", () => {
    // Kiedy Loguje się po raz pierwszy
    cy.getBySel("user-onboarding-dialog");
    // Wtedy Powinienem zobaczyć formularz startowy
    cy.getBySel("user-onboarding-dialog-title").contains(
      "h2",
      "Get Started with Real World App"
    );
    // Kiedy Rozpocznę wypełnianie formularza
    cy.getBySel("user-onboarding-next").click();
    cy.getBySel("user-onboarding-dialog-title").contains(
      "h2",
      "Create Bank Account"
    );
    // Oraz Wprowadze nazwę mojego banku
    cy.get("#bankaccount-bankName-input").type("Narodowy Bank Polski");
    // Oraz Wprowadze numer identyfikacyjny banku
    cy.get("#bankaccount-routingNumber-input").type(123456789);
    // Oraz Wprowadze numer konta bankowego
    cy.get("#bankaccount-accountNumber-input").type(987654321);
    // Oraz Potwierdzę wprowadzone dane
    cy.getBySel("bankaccount-submit").should("contain.text", "Save").click();
    // Wtedy Powinienem móc zakończyć wypełnianie formularza
    cy.getBySel("user-onboarding-dialog-title").contains("h2", "Finished");
    cy.getBySel("user-onboarding-next").should("contain.text", "Done").click();
    cy.getBySel("user-onboarding-dialog").should("not.exist");
  });
  it("Dodanie nowej transakcji", () => {
    // Gdy Jestem zalogowany i wypełniłem formularz startowy
    cy.getBySel("sidenav-username").should("contain.text", "GutMat");
    cy.getBySelLike("transaction-item").should("have.length.gte", 1);
    // Wtedy Powinienem móc dodać nową transakcję
    cy.intercept("GET", "/users").as("users");
    cy.getBySel("nav-top-new-transaction")
      .should("contain.text", "New")
      .click();
    cy.url().should("include", "/transaction/new");
    cy.wait("@users");
    // Kiedy Wybiorę drugą osobę do wykonania transakcji
    cy.getBySelLike("user-list-item").first().click();
    // Oraz Wprowadze kwotę transakcji
    cy.get("#amount").type(100);
    // Oraz Wprowadze tytuł transakcji
    cy.get("#transaction-create-description-input").type("Pożyczka");
    // Wtedy Mogę wykonać daną transakcję
    cy.getBySel("transaction-create-submit-request")
      .as("transactionSubmitRequestButton")
      .should("not.have.attr", "disabled");
    cy.get("@transactionSubmitRequestButton").click();
    cy.getBySel("alert-bar-success")
      .should("be.visible")
      .and("have.text", "Transaction Submitted!");
  });
});
