Feature: login

Scenario: User sees content on Homepage
    Given I am logged in with a "<username>" and "<password>"
    When I should see homepage
    Then Live label is visible for new shoulder content events
    Then Metadata is visible below the tiles
    Then Set up reminder for Coming up events
    Then Playback starts when selecting a playable event

    Examples:
    | username          | password |
    | Friday            | TGIF   |
    | Sunday            | Nope   |
    | anything else!    | Nope   |