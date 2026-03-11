# NibbleCheck 🐶🍽️

NibbleCheck is a mobile app and FastAPI backend that helps users check whether foods are safe for dogs using photos, barcodes, or ingredient text. It combines image-based detection, text resolution, and a curated PostgreSQL knowledge base to return clear verdicts: **SAFE**, **CAUTION**, or **UNSAFE**.

---

## Overview

Dog owners often find mixed or unclear information online when trying to check if a food is safe for their pets. NibbleCheck was built to make that process faster, clearer, and more reliable.

The app lets users:
- scan or upload a food photo
- search by text
- resolve ingredient lists
- receive a dog-safety verdict with a short explanation

Rather than only classifying food images, NibbleCheck also uses a structured knowledge base of foods, synonyms, and rules so results are more explainable and practical.

---

## Features

- **Photo to verdict**  
  Detects food items from an image and returns a safety status for dogs.

- **Text and ingredient resolution**  
  Resolves plain food names or ingredient lists into structured verdicts.

- **Explainable results**  
  Each result includes a short reason, not just a label.

- **Synonym and fuzzy matching**  
  Handles food variants, misspellings, plural forms, and alternate names.

- **Rule-based reasoning**  
  Supports context like preparation, parts, and ingredients such as seeds, bones, or xylitol.

- **Mobile-first experience**  
  Built with Expo React Native for a simple and practical interface.

---

## Example Use Cases

- A user uploads a photo of grapes and gets **UNSAFE**
- A user scans a snack label containing xylitol and gets **UNSAFE**
- A user searches “apple slices” and gets **SAFE**, with caution noted for seeds
- A user pastes an ingredient list and receives an overall verdict based on matched ingredients

---

## How It Works

1. **Input**  
   The user submits a photo, barcode, food name, or ingredient text.

2. **Detection / Resolution**  
   Candidate foods are identified from image labels, search terms, or parsed ingredient tokens.

3. **Normalization**  
   Inputs are mapped to canonical foods using:
   - exact synonym matching
   - canonical name matching
   - fuzzy matching with PostgreSQL `pg_trgm`

4. **Knowledge Base Lookup**  
   Matched foods are checked against curated statuses, notes, and rule conditions.

5. **Verdict Generation**  
   The backend returns:
   - per-item verdicts
   - an overall status
   - short explanations for why the result was assigned

---

## Project Structure

```text
NibbleCheck/
  backend/   # FastAPI backend, PostgreSQL schema, API logic
  mobile/    # Expo React Native mobile client

```
## Caution & Privacy

NibbleCheck is an educational and portfolio project intended to support general dog food safety checks. It is not a substitute for professional veterinary advice, diagnosis, or emergency care. In urgent situations, users should contact a licensed veterinarian or pet poison hotline immediately.

The project is designed with minimal data collection in mind. NibbleCheck does not rely on sensitive personal information for core functionality, and any optional logging or feedback is used only to improve system accuracy and user experience.