# Ecommerce-app-deno-react

An e-commerce like app with Deno and React.js.

# Start the server

```
denon start
```

# Misc

```
deno 1.21.3 
v8 10.0.139.17
typescript 4.6.2
```

### Install denon v2.5.0

```
deno install -qAf --unstable https://deno.land/x/denon@2.5.0/denon.ts
```

## Migrations

- Down:

```
deno run --unstable --allow-env --allow-net database/migrate.ts --down
```

- Up:

```
deno run --unstable --allow-env --allow-net database/migrate.ts --up
```

## Seeds

```
deno run --unstable --allow-env --allow-net database/seeds.ts
```

## Tests

```
deno --unstable  test --allow-env --allow-net --config ./tsconfig.json
```
