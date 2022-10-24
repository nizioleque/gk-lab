# Polygon Paint

Norbert Niziołek – Grafika komputerowa 1

## Uruchamianie

### Przez stronę internetową (zalecane)

Aplikacja jest dostępna pod adresem https://polygon-paint.niziolek.dev.

### Uruchomienie na lokalnej maszynie

Wymagania:

- _NodeJS_ – https://nodejs.org/it/download/. Używana wersja: 16.17.1
- Zalecane: _Yarn_ zamiast _npm_

Aplikację można uruchomić na swoim komputerze na dwa sposoby.

Najpierw należy pobrać to repozytorium. Następnie, w rozpakowanym folderze z plikiem `package.json` należy wywołać komendę `npm install` (lub `yarn`) aby pobrać wszystkie zależności.

Następnie, aby uruchomić aplikację:

- poprzez _development server_ (serwer, który na bieżąco odświeża aplikację przy zmianach, niezoptymalizowany): należy wywołać komendę `npm start` (lub `yarn start`). Aplikacja zostanie uruchomiona pod adresem `localhost:3000`
- poprzez _production build_ (produkcyjna wersja, zoptymalizowana): należy wywołać komendę `npm run build` (lub `yarn build`) aby zbudować produkcyjną wersję aplikacji do folderu `build`. Następnie można uruchomić zbudowaną aplikację z tego folderu używając dowolnego web servera, np. tego rozszerzenia do VS Code: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

## Instrukcja obsługi

Wszystkie opcje dostępne są w menu z lewej strony ekranu. Po wybraniu niektórych narzędzi pokazuje się dodatkowe wyjaśnienie. Dodatkowo, narzędzia można wybierać klawiszami `1`-`6`.

Aktywne ograniczenia długości i prostopadłości wyświetlone są w sekcji _Ograniczenia_. Po najechaniu myszką na ograniczenie, podświetlone zostają krawędzie, których dotyczy. Przyciskiem _Usuń_ można usunąć ograniczenie.

Predefiniowane sceny dostępne są w menu, w sekcji _Sceny_.

## Opis algorytmu ograniczeń

Po każdej modyfikacji dowolnego wielokąta pozycje wszystkich wierzchołków są obliczane na nowo w oparciu o ograniczenia.

Klasa ograniczenia prostopadłości posiada pole `a`, które zawiera pożądane współczynniki kierunkowe prostych – jest ono uzupełniane podczas aplikowania ograniczeń.

Algorytm aplikowania ograniczeń (wywoływany w pętli, dla każdej krawędzi każdego wielokąta):

- Jeśli krawędź posiada ograniczenia prostopadłości, zaaplikuj je:
  - Jeśli w obiekcie ograniczenia jest już wprowadzona wartość `a`, zaaplikuj ją (przesuń koniec krawędzi)
  - Jeśli w obiekcie ograniczenia nie ma wprowadzonej wartości `a`, oblicz ją (na podstawie aktualnej pozycji krawędzi) i wpisz do obiektu ograniczenia. Następnie, przejdź rekurencyjnie po całej "ścieżce" (w rozumieniu ścieżki w grafie) ograniczeń wprowadzając odpowiednio wartości `a`.
    - Jeśli napotkane zostanie ograniczenie, które ma już wprowadzoną wartość `a` i jest ona zgodna, to znaleziono cykl parzysty – przerwij rekurencyjne wywołania
    - Jeśli napotkane zostanie ograniczenie, które ma już wprowadzoną wartość `a` i jest ona sprzeczna (z tą, którą chcieliśmy wpisać), to znaleziono cykl nieparzysty, czyli ograniczenia niemożliwe do zrealizowania – wyświetl komunikat o błędzie
- Jeśli krawędź posiada ograniczenie długości, przesuń końcowy wierzchołek proporcjonalnie (tak, aby zachować współczynnik kierunkowy i nie _zepsuć_ wcześniej zaaplikowanego ograniczenia prostopadłości) aby uzyskać odpowiednią długość krawędzi

Dzięki takiemu podejściu (obliczamy wartości `a` _do przodu_, zmieniamy długość krawędzi nie zmieniając współczynnika kierunkowego, najpierw ustawiamy współczynnik kierunkowy a dopiero długość), obliczenia wykonywane przy _poprawianiu_ pewnej krawędzi nie wpływają na krawędzie, które zostały już _poprawione_ i nie ma potrzeby wielokrotnego wprowadzania ograniczeń. Z jednym wyjątkiem – poprawiając ostatnią krawędź danego wielokąta, przesuwamy jej koniec, który jest jednocześnie początkiem pierwszej krawędzi tego wielokąta.

Dodatkowo, wprowadzono następujące usprawnienia:

- Przed rozpoczęciem wprowadzania ograniczeń, wprowadzane są (powyżej opisanym algorytmem rekurencyjnym) wartości współczynnika `a` dla przesuwanej krawędzi (lub obu krawędzi przylegających do przesuwanego wierzchołka) - dzięki temu krawędź _ruszana_ narzuca innym krawędziom swoje położenie, a nie odwrotnie, więc zmiany bardziej podążają za kursorem myszki
- Ograniczenia aplikowane są zaczynając od krawędzi, którą porusza użytkownik – cel jak wyżej
- Ograniczenie prostopadłości aplikowane jest w taki sposób, żeby nowy punkt końcowy krawędzi leżał na prostej wyznaczonej przez kolejną krawędź – dzięki temu korygowanie kąta jednej krawędzi nie zmienia kąta następnej krawędzi
- Po zaaplikowaniu wszystkich ograniczeń, ograniczenia długości aplikowane są jeszcze raz, w odwrotnej kolejności, aby zminimalizować negatywne skutki zjawiska opisanego powyżej (poprawiając ostatnią krawędź możemy _zepsuć_ pierwszą).

Przy obliczeniach wykorzystano też następujące założenia:

- Jeśli jeden odcinek ma współczynnik kierunkowy `0`, odcinek prostopadły do niego otrzymuje współczynnik kierunkowy `10000` (pion)
- Długości i współczynniki kierunkowe uznajemy za równe, jeśli różnią się o mniej niż `0.01`.

Implementacja algorytmu znajduje się w plikach

- [Polygon.ts](src/class/Polygon.ts) – metoda `applyRestrictions`, z pętlami uruchamiającymi aplikowanie ograniczeń
- [Line.ts](src/class/Line.ts) – metody `applyRestrictions`, `applyA`, `applyLength`, które aplikują ograniczenia w odpowiedniej kolejności i obliczają nowe współrzędne punktów końcowych
- [Restriction.ts](src/class/Restriction.ts) – metoda `setA`, która rekurencyjnie wpisuje wartości współczynników `a` do ograniczeń
