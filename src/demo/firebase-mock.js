// Mock firebase as it is normally included as an external dependency
import FirebaseMock from 'mson/lib/stores/firebase-mock';
global.firebase = new FirebaseMock();
