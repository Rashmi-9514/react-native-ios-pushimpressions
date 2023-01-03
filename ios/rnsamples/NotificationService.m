//
//  NotificationService.m
//  rnsamples
//
//  Created by Rashmi Yadav on 12/09/22.
//

#import "NotificationService.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <CleverTap-iOS-SDK/CleverTap.h>
#import <clevertap-react-native/CleverTapReactManager.h>


@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
  

  NSUserDefaults *userdefaults = [[NSUserDefaults standardUserDefaults]initWithSuiteName:@"group.com.ct-push"];

  NSString *email = [userdefaults objectForKey:@"email"];
  NSLog(@"\n \n APP GROUPS DATA FROM JS :: %@", email);
  
  if(email!=nil){
    NSDictionary *profile = @{

        @"Identity": email,         // String or number

    };

    [[CleverTap sharedInstance] onUserLogin:profile];
  }
  [[CleverTap sharedInstance] recordNotificationViewedEventWithData:request.content.userInfo];
  [super didReceiveNotificationRequest:request withContentHandler:contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
