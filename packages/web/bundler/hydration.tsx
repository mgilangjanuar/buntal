/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client'
import { App } from '../app'

hydrateRoot(document, <App />)
