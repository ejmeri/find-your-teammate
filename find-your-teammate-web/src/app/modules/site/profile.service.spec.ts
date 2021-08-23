import { TestBed } from '@angular/core/testing';

import { ProfilePlayerService } from './profile_player/profile_player.service';

describe('ProfileService', () => {
  let service: ProfilePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
